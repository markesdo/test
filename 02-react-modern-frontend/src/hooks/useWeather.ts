import { useState } from "react";
import { WeatherData } from "../components/WeatherDisplay";

export interface ForecastDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
}

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

interface ForecastListItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface OpenWeatherForecastResponse {
  list: ForecastListItem[];
  city: {
    name: string;
    country: string;
  };
}

interface UseWeatherReturn {
  weather: WeatherData | null;
  forecast: ForecastDay[];
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
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const processForecastData = (
    data: OpenWeatherForecastResponse
  ): ForecastDay[] => {
    const dailyData: { [key: string]: ForecastListItem[] } = {};

    // Group forecast items by date
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    // Process each day
    const forecastDays: ForecastDay[] = [];
    const dates = Object.keys(dailyData).slice(0, 5); // Get first 5 days

    dates.forEach((date) => {
      const dayItems = dailyData[date];
      const temps = dayItems.map((item) => item.main.temp);
      const tempMax = Math.max(...temps);
      const tempMin = Math.min(...temps);

      // Find midday item (closest to 12:00) or use first item
      const middayItem =
        dayItems.find((item) => item.dt_txt.includes("12:00:00")) ||
        dayItems[0];

      const dateObj = new Date(middayItem.dt * 1000);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let dayName: string;
      if (dateObj.toDateString() === today.toDateString()) {
        dayName = "Today";
      } else if (dateObj.toDateString() === tomorrow.toDateString()) {
        dayName = "Tomorrow";
      } else {
        dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
      }

      forecastDays.push({
        date,
        dayName,
        tempMax,
        tempMin,
        description: middayItem.weather[0].description,
        icon: middayItem.weather[0].icon,
      });
    });

    return forecastDays;
  };

  const fetchForecast = async (city: string) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    if (!apiKey) {
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
      }

      const data: OpenWeatherForecastResponse = await response.json();
      const processedForecast = processForecastData(data);
      setForecast(processedForecast);
    } catch (err) {
      // Forecast errors are not critical, just log them
      console.error("Forecast fetch error:", err);
      setForecast([]);
    }
  };

  const fetchForecastByLocation = async (
    latitude: number,
    longitude: number
  ) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    if (!apiKey) {
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
      }

      const data: OpenWeatherForecastResponse = await response.json();
      const processedForecast = processForecastData(data);
      setForecast(processedForecast);
    } catch (err) {
      // Forecast errors are not critical, just log them
      console.error("Forecast fetch error:", err);
      setForecast([]);
    }
  };

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

      // Fetch forecast data
      await fetchForecast(city);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setWeather(null);
      setForecast([]);
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

      // Fetch forecast data
      await fetchForecastByLocation(latitude, longitude);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    forecast,
    loading,
    error,
    fetchWeather,
    fetchWeatherByLocation,
  };
};

export default useWeather;
