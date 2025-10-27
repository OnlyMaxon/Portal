import './MobileAppSection.css';

function MobileAppSection() {
  return (
    <div className="mobile-app-section">
      <div className="app-card">
        <div className="app-content">
          <h2 className="app-title">Get the Full Experience</h2>
          <p className="app-description">
            Download the <strong>Portal</strong> mobile app to access all features including:
          </p>
          
          <ul className="app-features">
            <li>
              <span className="feature-icon">✉️</span>
              Send messages and connection requests
            </li>
            <li>
              <span className="feature-icon">🔍</span>
              Advanced search with all filters
            </li>
            <li>
              <span className="feature-icon">💬</span>
              Real-time chat and video calls
            </li>
            <li>
              <span className="feature-icon">🌟</span>
              Premium features and matching algorithms
            </li>
          </ul>

          <div className="app-badges">
            <div className="badge">
              <div className="badge-icon">📱</div>
              <div className="badge-text">
                <div className="badge-label">Download on the</div>
                <div className="badge-name">App Store</div>
              </div>
            </div>
            <div className="badge">
              <div className="badge-icon">🤖</div>
              <div className="badge-text">
                <div className="badge-label">Get it on</div>
                <div className="badge-name">Google Play</div>
              </div>
            </div>
          </div>
        </div>

        <div className="app-illustration">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="app-preview">
                <div className="preview-header">
                  <div className="preview-title">Portal</div>
                </div>
                <div className="preview-content">
                  <div className="preview-globe">🌍</div>
                  <div className="preview-text">Find anyone anywhere</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileAppSection;
