
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import AnimatedWeatherIcon from './AnimatedWeatherIcon';

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

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const getBackgroundGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return 'from-yellow-200 via-orange-200 to-pink-200';
      case 'clouds':
      case 'cloudy':
        return 'from-gray-200 via-blue-200 to-purple-200';
      case 'rain':
      case 'drizzle':
        return 'from-blue-200 via-blue-300 to-gray-300';
      case 'snow':
        return 'from-blue-100 via-white to-gray-100';
      default:
        return 'from-pastel-blue via-pastel-pink to-pastel-lavender';
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto bg-gradient-to-br ${getBackgroundGradient(weatherData.condition)} border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-scale-in rounded-3xl overflow-hidden`}>
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          {/* Location */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {weatherData.city}
            </h2>
            <p className="text-gray-600 font-medium">
              {weatherData.country}
            </p>
          </div>

          {/* Weather Icon */}
          <div className="py-4">
            <AnimatedWeatherIcon 
              condition={weatherData.condition} 
              size={80}
              className="mx-auto"
            />
          </div>

          {/* Temperature */}
          <div className="space-y-2">
            <div className="text-6xl font-bold text-gray-800 animate-fade-in-up">
              {Math.round(weatherData.temperature)}°C
            </div>
            <p className="text-xl text-gray-600 capitalize font-medium">
              {weatherData.description}
            </p>
            <p className="text-sm text-gray-500">
              Feels like {Math.round(weatherData.feelsLike)}°C
            </p>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/30">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/50 transition-all duration-300">
              <p className="text-2xl font-bold text-gray-800">
                {weatherData.humidity}%
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Humidity 💧
              </p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/50 transition-all duration-300">
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(weatherData.windSpeed)} km/h
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Wind Speed 💨
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
