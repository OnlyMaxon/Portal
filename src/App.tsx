import { useState, useEffect } from 'react'
import Globe from './components/Globe'
import Header from './components/Header'
import Statistics from './components/Statistics'
import Filters from './components/Filters'
import MobileAppSection from './components/MobileAppSection'
import './App.css'

interface CountryData {
  name: string;
  code: string;
  coordinates: [number, number];
  nationalities: { [key: string]: number };
  languages: { [key: string]: number };
}

// Sample data for demonstration
const countriesData: CountryData[] = [
  {
    name: 'United States',
    code: 'US',
    coordinates: [37.0902, -95.7129],
    nationalities: { 'American': 80, 'Hispanic': 10, 'Asian': 5, 'Other': 5 },
    languages: { 'English': 80, 'Spanish': 15, 'Other': 5 }
  },
  {
    name: 'Russia',
    code: 'RU',
    coordinates: [61.5240, 105.3188],
    nationalities: { 'Russian': 85, 'Tatar': 5, 'Ukrainian': 3, 'Other': 7 },
    languages: { 'Russian': 90, 'Tatar': 5, 'Other': 5 }
  },
  {
    name: 'China',
    code: 'CN',
    coordinates: [35.8617, 104.1954],
    nationalities: { 'Han Chinese': 90, 'Zhuang': 2, 'Hui': 1, 'Other': 7 },
    languages: { 'Mandarin': 85, 'Cantonese': 5, 'Other': 10 }
  },
  {
    name: 'Brazil',
    code: 'BR',
    coordinates: [-14.2350, -51.9253],
    nationalities: { 'Brazilian': 85, 'Portuguese': 5, 'Italian': 3, 'Other': 7 },
    languages: { 'Portuguese': 95, 'Spanish': 3, 'Other': 2 }
  },
  {
    name: 'Germany',
    code: 'DE',
    coordinates: [51.1657, 10.4515],
    nationalities: { 'German': 85, 'Turkish': 5, 'Polish': 3, 'Other': 7 },
    languages: { 'German': 92, 'English': 5, 'Other': 3 }
  },
  {
    name: 'Japan',
    code: 'JP',
    coordinates: [36.2048, 138.2529],
    nationalities: { 'Japanese': 98, 'Other': 2 },
    languages: { 'Japanese': 99, 'Other': 1 }
  }
];

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      
      <main className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">Find Anyone Anywhere in the World</h1>
          <p className="hero-subtitle">
            Explore the interactive 3D globe, select a country, and discover statistics on nationalities and languages
          </p>
        </div>

        <div className="globe-container">
          <Globe 
            theme={theme} 
            countries={countriesData}
            onCountrySelect={setSelectedCountry}
          />
        </div>

        {selectedCountry && (
          <Statistics country={selectedCountry} />
        )}

        <Filters />
        
        <MobileAppSection />
      </main>

      <footer className="footer">
        <p>© 2025 Portal. Full functionality available in the Portal mobile app.</p>
      </footer>
    </div>
  )
}

export default App
