import './Statistics.css';

interface StatisticsProps {
  country: {
    name: string;
    code: string;
    nationalities: { [key: string]: number };
    languages: { [key: string]: number };
  };
}

function Statistics({ country }: StatisticsProps) {
  return (
    <div className="statistics">
      <h2 className="statistics-title">
        Statistics for {country.name}
      </h2>
      
      <div className="statistics-grid">
        <div className="stat-card">
          <h3>Nationalities</h3>
          <div className="stat-list">
            {Object.entries(country.nationalities).map(([nationality, percentage]) => (
              <div key={nationality} className="stat-item">
                <div className="stat-label">{nationality}</div>
                <div className="stat-bar-container">
                  <div 
                    className="stat-bar nationality"
                    style={{ width: `${percentage}%` }}
                  />
                  <span className="stat-value">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h3>Languages</h3>
          <div className="stat-list">
            {Object.entries(country.languages).map(([language, percentage]) => (
              <div key={language} className="stat-item">
                <div className="stat-label">{language}</div>
                <div className="stat-bar-container">
                  <div 
                    className="stat-bar language"
                    style={{ width: `${percentage}%` }}
                  />
                  <span className="stat-value">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
