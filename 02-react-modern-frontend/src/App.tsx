import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import FavoritesList from "./components/FavoritesList";
import "./App.css";

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
          <WeatherDisplay />
        </main>
        <FavoritesList />
      </div>
    </div>
  );
};

export default App;
