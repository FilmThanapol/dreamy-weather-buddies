
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchWeatherData, WeatherResponse } from '@/services/weatherService';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setWeatherData(null);

    try {
      console.log('Starting weather search for:', city);
      const data: WeatherResponse = await fetchWeatherData(city);
      
      const transformedData: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed * 3.6, // Convert m/s to km/h
        feelsLike: data.main.feels_like,
      };

      console.log('Transformed weather data:', transformedData);
      setWeatherData(transformedData);
      
      toast({
        title: "Weather data loaded! 🌤️",
        description: `Current weather for ${transformedData.city}`,
      });
    } catch (error) {
      console.error('Weather search error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
      
      toast({
        title: "Oops! 😔",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Cute Weather ☀️
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Your adorable weather companion 🌈
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Content Area */}
        <div className="flex justify-center">
          {isLoading ? (
            <LoadingSpinner />
          ) : weatherData ? (
            <WeatherCard weatherData={weatherData} />
          ) : (
            <div className="text-center space-y-4 animate-fade-in-up">
              <div className="text-6xl mb-4">🌤️</div>
              <h2 className="text-2xl font-semibold text-gray-700">
                Ready for weather magic? ✨
              </h2>
              <p className="text-gray-500 text-lg">
                Search for any city to see its current weather!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p className="text-sm">
            Made with 💖 and lots of cute animations
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
