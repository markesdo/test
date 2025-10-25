import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import FavoritesList from "./components/FavoritesList";
import useWeather from "./hooks/useWeather";
import useGeolocation from "./hooks/useGeolocation";
import "./App.css";
import "./animations.css";
import "./backgrounds.css";

const App = () => {
  const { weather, loading, error, fetchWeather, fetchWeatherByLocation } =
    useWeather();
  const { getCurrentLocation } = useGeolocation();
  const [locationError, setLocationError] = useState("");

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  const handleLocationRequest = async () => {
    setLocationError("");
    try {
      const coords = await getCurrentLocation();
      await fetchWeatherByLocation(coords.latitude, coords.longitude);
    } catch (err) {
      if (err instanceof Error) {
        setLocationError(err.message);
      } else {
        setLocationError("Failed to get your location");
      }
    }
  };

  const displayError = error || locationError;

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <main className="main-content">
          <SearchBar
            onSearch={handleSearch}
            onLocationRequest={handleLocationRequest}
          />
          <WeatherDisplay
            weather={weather}
            loading={loading}
            error={displayError}
          />
        </main>
        <FavoritesList />
      </div>
    </div>
  );
};

export default App;
