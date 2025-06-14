
const API_KEY = '421c33f2a0ca6c04aab04283ecf334a6'; // OpenWeatherMap API key (public)
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherResponse {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  visibility?: number;
  uv?: number;
}

export interface ForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export const fetchWeatherData = async (city: string): Promise<WeatherResponse> => {
  try {
    console.log(`Fetching weather data for: ${city}`);
    
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    console.log('API Response status:', response.status);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      throw new Error(`Weather data unavailable (${response.status})`);
    }

    const data = await response.json();
    console.log('Weather data received:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetch7DayForecast = async (city: string): Promise<ForecastResponse> => {
  try {
    console.log(`Fetching 7-day forecast for: ${city}`);
    
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Forecast data unavailable (${response.status})`);
    }

    const data = await response.json();
    console.log('Forecast data received:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
