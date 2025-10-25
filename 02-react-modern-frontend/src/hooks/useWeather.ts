import { useState } from "react";
import { WeatherData } from "../components/WeatherDisplay";

interface OpenWeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string;
  fetchWeather: (city: string) => Promise<void>;
  fetchWeatherByLocation: (
    latitude: number,
    longitude: number
  ) => Promise<void>;
}

const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city: string) => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    if (!apiKey) {
      setError(
        "API key is missing. Please add VITE_OPENWEATHER_API_KEY to your .env file"
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "City not found. Please check the spelling and try again."
          );
        } else if (response.status === 401) {
          throw new Error("Invalid API key. Please check your .env file.");
        } else {
          throw new Error("Failed to fetch weather data. Please try again.");
        }
      }

      const data: OpenWeatherResponse = await response.json();

      const weatherData: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      };

      setWeather(weatherData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (
    latitude: number,
    longitude: number
  ) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    if (!apiKey) {
      setError(
        "API key is missing. Please add VITE_OPENWEATHER_API_KEY to your .env file"
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your .env file.");
        } else {
          throw new Error("Failed to fetch weather data. Please try again.");
        }
      }

      const data: OpenWeatherResponse = await response.json();

      const weatherData: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      };

      setWeather(weatherData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather, fetchWeatherByLocation };
};

export default useWeather;
