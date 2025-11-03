import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import './Globe.css';

interface CountryData {
  name: string;
  code: string;
  coordinates: [number, number];
  nationalities: { [key: string]: number };
  languages: { [key: string]: number };
}

interface GlobeProps {
  theme: 'light' | 'dark';
  countries: CountryData[];
  onCountrySelect: (country: CountryData) => void;
}

function EarthSphere({ theme, countries, onCountrySelect }: GlobeProps) {
  const worldRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const { gl } = useThree();

  // Public-domain/NASA based textures hosted by threejs.org examples
  // For production, consider downloading these into /public/textures/earth and referencing locally.
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    // NOTE: Replace these with local 4k/8k assets in /public/textures/earth/* for best results.
    // Public-domain NASA textures are recommended.
    'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
    'https://threejs.org/examples/textures/planets/earth_normal_2048.jpg',
    'https://threejs.org/examples/textures/planets/earth_specular_2048.jpg',
    'https://threejs.org/examples/textures/planets/earth_clouds_1024.png',
  ]);

  // Improve texture filtering
  useMemo(() => {
    const maxAniso = gl?.capabilities?.getMaxAnisotropy?.() ?? 16;
    [colorMap, normalMap, specularMap, cloudsMap].forEach((tx, i) => {
      if (!tx) return;
      // Correct color space handling (albedo in sRGB, data maps in linear)
      if (i === 0) {
        // color (albedo)
        if ((THREE as any).SRGBColorSpace && (tx as any)) {
          (tx as any).colorSpace = (THREE as any).SRGBColorSpace;
        }
        if ((THREE as any).sRGBEncoding && (tx as any)) {
          (tx as any).encoding = (THREE as any).sRGBEncoding;
        }
      }
      tx.generateMipmaps = true;
      tx.minFilter = THREE.LinearMipmapLinearFilter;
      tx.magFilter = THREE.LinearFilter;
      tx.anisotropy = Math.max(8, maxAniso);
      tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
      tx.needsUpdate = true;
    });
  }, [colorMap, normalMap, specularMap, cloudsMap, gl]);

  // Auto-rotate the entire world; add subtle extra rotation to clouds for drift
  useFrame((_state, delta) => {
    if (worldRef.current) worldRef.current.rotation.y += delta * 0.05;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.01;
  });

  // Convert lat/long to 3D coordinates on sphere
  const latLongToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  };

  // Minimal set of major cities for visual reference
  type CityData = { name: string; coordinates: [number, number]; };
  const majorCities: CityData[] = useMemo(
    () => [
      { name: 'New York', coordinates: [40.7128, -74.006] },
      { name: 'Los Angeles', coordinates: [34.0522, -118.2437] },
      { name: 'London', coordinates: [51.5074, -0.1278] },
      { name: 'Paris', coordinates: [48.8566, 2.3522] },
      { name: 'Tokyo', coordinates: [35.6762, 139.6503] },
      { name: 'Beijing', coordinates: [39.9042, 116.4074] },
      { name: 'São Paulo', coordinates: [-23.5505, -46.6333] },
      { name: 'Sydney', coordinates: [-33.8688, 151.2093] },
      { name: 'Cairo', coordinates: [30.0444, 31.2357] },
      { name: 'Moscow', coordinates: [55.7558, 37.6173] },
      { name: 'Mumbai', coordinates: [19.076, 72.8777] },
      { name: 'Mexico City', coordinates: [19.4326, -99.1332] },
    ],
    []
  );

  return (
    <>
      {/* Sun light to create realistic shading/specular highlights (does not rotate with globe) */}
      <directionalLight position={[5, 2, 5]} intensity={theme === 'light' ? 1.2 : 0.9} />
      <group ref={worldRef}>
        {/* Main Earth with textures */}
        <mesh ref={earthRef}>
          <sphereGeometry args={[2, 256, 256]} />
          {/* Use Phong for specular map support on oceans */}
          {/* eslint-disable-next-line react/no-unknown-property */}
          <meshPhongMaterial
            map={colorMap as THREE.Texture}
            normalMap={normalMap as THREE.Texture}
            specularMap={specularMap as THREE.Texture}
            specular={new THREE.Color(theme === 'light' ? 0x333333 : 0x222222)}
            shininess={12}
          />
        </mesh>

        {/* Cloud layer (slightly larger radius) */}
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[2.03, 256, 256]} />
          <meshPhongMaterial
            map={cloudsMap as THREE.Texture}
            transparent
            opacity={theme === 'light' ? 0.35 : 0.25}
            depthWrite={false}
          />
        </mesh>

        {/* Country markers (kept from existing data) */}
        {countries.map((country) => {
          const position = latLongToVector3(country.coordinates[0], country.coordinates[1], 2.05);
          const isHovered = hovered === country.code;

          return (
            <mesh
              key={country.code}
              position={position}
              onPointerOver={() => setHovered(country.code)}
              onPointerOut={() => setHovered(null)}
              onClick={() => onCountrySelect(country)}
            >
              <sphereGeometry args={[isHovered ? 0.08 : 0.05, 24, 24]} />
              <meshStandardMaterial
                color={isHovered ? '#fbbf24' : '#ef4444'}
                emissive={isHovered ? '#fbbf24' : '#ef4444'}
                emissiveIntensity={isHovered ? 0.9 : 0.5}
              />
            </mesh>
          );
        })}

        {/* City markers (smaller, blue) */}
        {majorCities.map((city) => {
          const position = latLongToVector3(city.coordinates[0], city.coordinates[1], 2.04);
          const isHovered = hoveredCity === city.name;
          return (
            <mesh
              key={city.name}
              position={position}
              onPointerOver={() => setHoveredCity(city.name)}
              onPointerOut={() => setHoveredCity(null)}
            >
              <sphereGeometry args={[isHovered ? 0.055 : 0.04, 18, 18]} />
              <meshStandardMaterial
                color={isHovered ? '#38bdf8' : '#22d3ee'}
                emissive={isHovered ? '#38bdf8' : '#0891b2'}
                emissiveIntensity={isHovered ? 0.9 : 0.5}
              />
            </mesh>
          );
        })}

        {/* Subtle atmosphere glow */}
        <Sphere args={[2.12, 256, 256]}>
          <meshBasicMaterial
            color={theme === 'light' ? '#93c5fd' : '#60a5fa'}
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>
    </>
  );
}

function Globe({ theme, countries, onCountrySelect }: GlobeProps) {
  return (
    <div className="globe-canvas">
      <Canvas
        dpr={[1, 2.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 45, near: 0.05, far: 1000 }}
      >
        <ambientLight intensity={theme === 'light' ? 0.5 : 0.4} />
        
        <EarthSphere theme={theme} countries={countries} onCountrySelect={onCountrySelect} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.15}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
      
      <div className="globe-hint">
        <p>🌍 Drag to rotate • Scroll to zoom • Click markers for country stats</p>
      </div>
    </div>
  );
}

export default Globe;
