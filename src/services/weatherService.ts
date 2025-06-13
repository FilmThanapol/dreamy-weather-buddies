
const API_KEY = '87f68f0e19164b6ca5daa6e8de7ac26b'; // OpenWeatherMap API key (public)
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherResponse {
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
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
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
