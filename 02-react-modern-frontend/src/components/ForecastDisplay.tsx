import { ForecastDay } from "../hooks/useWeather";
import "./ForecastDisplay.css";

interface ForecastDisplayProps {
  forecast: ForecastDay[];
  loading: boolean;
}

const ForecastDisplay = ({ forecast, loading }: ForecastDisplayProps) => {
  // Don't show anything if loading or no forecast data
  if (loading || forecast.length === 0) {
    return null;
  }

  return (
    <div className="forecast-display">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-day">{day.dayName}</div>
            <div className="forecast-icon-container">
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="forecast-icon"
              />
            </div>
            <div className="forecast-temps">
              <span className="temp-high">{Math.round(day.tempMax)}°</span>
              <span className="temp-separator">/</span>
              <span className="temp-low">{Math.round(day.tempMin)}°</span>
            </div>
            <div className="forecast-description">{day.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
