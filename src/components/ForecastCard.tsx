
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import AnimatedWeatherIcon from './AnimatedWeatherIcon';

interface ForecastDay {
  date: string;
  condition: string;
  description: string;
  tempMin: number;
  tempMax: number;
}

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-scale-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forecast.map((day, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 border-pastel-blue rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 dark:bg-gray-800/80 dark:border-gray-600">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {day.date}
              </h3>
              <AnimatedWeatherIcon 
                condition={day.condition} 
                size={48}
                className="mx-auto mb-2"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mb-2">
                {day.description}
              </p>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-blue-600 dark:text-blue-400">
                  {Math.round(day.tempMin)}°
                </span>
                <span className="text-red-500 dark:text-red-400">
                  {Math.round(day.tempMax)}°
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
