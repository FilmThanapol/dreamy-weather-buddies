
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import AnimatedWeatherIcon from './AnimatedWeatherIcon';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  sunrise?: string;
  sunset?: string;
  uvIndex?: number;
  visibility?: number;
}

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { t } = useLanguage();

  const getBackgroundGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return 'from-yellow-200 via-orange-200 to-pink-200 dark:from-yellow-800 dark:via-orange-800 dark:to-pink-800';
      case 'clouds':
      case 'cloudy':
        return 'from-gray-200 via-blue-200 to-purple-200 dark:from-gray-700 dark:via-blue-700 dark:to-purple-700';
      case 'rain':
      case 'drizzle':
        return 'from-blue-200 via-blue-300 to-gray-300 dark:from-blue-800 dark:via-blue-700 dark:to-gray-700';
      case 'snow':
        return 'from-blue-100 via-white to-gray-100 dark:from-blue-900 dark:via-gray-800 dark:to-gray-700';
      default:
        return 'from-pastel-blue via-pastel-pink to-pastel-lavender dark:from-gray-800 dark:via-gray-700 dark:to-gray-600';
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto bg-gradient-to-br ${getBackgroundGradient(weatherData.condition)} border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-scale-in rounded-3xl overflow-hidden`}>
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          {/* Location */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {weatherData.city}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
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
            <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 animate-fade-in-up">
              {Math.round(weatherData.temperature)}°C
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 capitalize font-medium">
              {weatherData.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {t('feelsLike')} {Math.round(weatherData.feelsLike)}°C
            </p>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/30 dark:border-gray-600/30">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/50 transition-all duration-300 dark:bg-gray-800/40 dark:hover:bg-gray-700/50">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {weatherData.humidity}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {t('humidity')}
              </p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/50 transition-all duration-300 dark:bg-gray-800/40 dark:hover:bg-gray-700/50">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {Math.round(weatherData.windSpeed)} km/h
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {t('windSpeed')}
              </p>
            </div>
          </div>

          {/* Additional Details */}
          {(weatherData.sunrise || weatherData.sunset || weatherData.visibility) && (
            <div className="grid grid-cols-2 gap-4 pt-4">
              {weatherData.sunrise && (
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-3 text-center hover:bg-white/50 transition-all duration-300 dark:bg-gray-800/40 dark:hover:bg-gray-700/50">
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {weatherData.sunrise}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {t('sunrise')}
                  </p>
                </div>
              )}
              {weatherData.sunset && (
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-3 text-center hover:bg-white/50 transition-all duration-300 dark:bg-gray-800/40 dark:hover:bg-gray-700/50">
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {weatherData.sunset}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {t('sunset')}
                  </p>
                </div>
              )}
              {weatherData.visibility && (
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-3 text-center hover:bg-white/50 transition-all duration-300 col-span-2 dark:bg-gray-800/40 dark:hover:bg-gray-700/50">
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {(weatherData.visibility / 1000).toFixed(1)} km
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {t('visibility')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
