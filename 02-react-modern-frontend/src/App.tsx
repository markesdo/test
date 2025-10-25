import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherDisplay, { WeatherData } from "./components/WeatherDisplay";
import FavoritesList from "./components/FavoritesList";
import "./App.css";

// MOCKUP DATA FOR TESTING - Remove when API is integrated
const mockWeatherData: WeatherData = {
  city: "Vienna",
  country: "AT",
  temperature: 22,
  feelsLike: 20,
  description: "clear sky",
  humidity: 65,
  windSpeed: 3.5,
  icon: "01d", // clear sky day icon
};

const App = () => {
  const [searchedCity, setSearchedCity] = useState("");

  const handleSearch = (city: string) => {
    setSearchedCity(city);
    console.log("Searching for:", city);
    // Weather API call will be implemented later
  };

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <main className="main-content">
          <SearchBar onSearch={handleSearch} />
          {/* Pass mockWeatherData prop to test the weather card */}
          <WeatherDisplay weather={mockWeatherData} />
        </main>
        <FavoritesList />
      </div>
    </div>
  );
};

export default App;
