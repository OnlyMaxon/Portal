import './Filters.css';

function Filters() {
  return (
    <div className="filters-section">
      <h2 className="filters-title">Search Filters</h2>
      <p className="filters-subtitle">
        Filter people by interests, language, and nationality
      </p>
      
      <div className="filters-grid">
        <div className="filter-card">
          <div className="filter-icon">🎯</div>
          <h3>Interests</h3>
          <p>Find people who share your hobbies and passions</p>
        </div>

        <div className="filter-card">
          <div className="filter-icon">🗣️</div>
          <h3>Language</h3>
          <p>Connect with speakers of your preferred languages</p>
        </div>

        <div className="filter-card">
          <div className="filter-icon">🌍</div>
          <h3>Nationality</h3>
          <p>Discover people from specific countries and cultures</p>
        </div>
      </div>

      <div className="filters-note">
        <p>
          <strong>Note:</strong> Full search and messaging features are available in the MeetPlace mobile application.
        </p>
      </div>
    </div>
  );
}

export default Filters;
