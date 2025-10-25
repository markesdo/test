import "./WeatherDisplay.css";

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface WeatherDisplayProps {
  weather: WeatherData | null;
  loading: boolean;
  error: string;
}

const WeatherDisplay = ({ weather, loading, error }: WeatherDisplayProps) => {
  // Loading state
  if (loading) {
    return (
      <div className="weather-display">
        <div className="weather-placeholder">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="weather-icon-loading"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
          <h2 className="placeholder-title">Loading weather data...</h2>
          <p className="placeholder-text">
            Please wait while we fetch the weather information
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="weather-display">
        <div className="weather-placeholder">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="weather-icon-error"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h2 className="placeholder-title error-title">
            Oops! Something went wrong
          </h2>
          <p className="placeholder-text error-message">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state (no data yet)
  if (!weather) {
    return (
      <div className="weather-display">
        <div className="weather-placeholder">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="weather-icon-placeholder"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <h2 className="placeholder-title">
            Search for a city to see weather!
          </h2>
          <p className="placeholder-text">
            Enter a city name above to see the current weather conditions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-display weather-card">
      <div className="weather-header">
        <h2 className="city-name">
          {weather.city}, {weather.country}
        </h2>
      </div>

      <div className="weather-main">
        <div className="weather-icon-container">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
            alt={weather.description}
            className="weather-icon"
          />
        </div>
        <div className="temperature-container">
          <div className="temperature">{Math.round(weather.temperature)}°</div>
          <div className="description">{weather.description}</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <div className="detail-content">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">
              {Math.round(weather.feelsLike)}°
            </span>
          </div>
        </div>

        <div className="detail-item">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
          </svg>
          <div className="detail-content">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
          </svg>
          <div className="detail-content">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{weather.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
