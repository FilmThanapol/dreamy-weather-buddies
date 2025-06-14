
import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from 'lucide-react';

interface AnimatedWeatherIconProps {
  condition: string;
  size?: number;
  className?: string;
}

const AnimatedWeatherIcon: React.FC<AnimatedWeatherIconProps> = ({ 
  condition, 
  size = 64, 
  className = "" 
}) => {
  const getWeatherIcon = () => {
    const iconProps = {
      size,
      className: `${className} transition-all duration-300`
    };

    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return (
          <div className="relative">
            <Sun 
              {...iconProps} 
              className={`${iconProps.className} text-weather-sunny animate-bounce-soft hover:animate-wiggle drop-shadow-lg`}
            />
            <div className="absolute inset-0 animate-ping opacity-20">
              <Sun {...iconProps} className="text-yellow-300" />
            </div>
          </div>
        );
      case 'clouds':
      case 'cloudy':
        return (
          <div className="relative">
            <Cloud 
              {...iconProps} 
              className={`${iconProps.className} text-weather-cloudy animate-float hover:scale-110 drop-shadow-lg`}
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-bounce opacity-60"></div>
          </div>
        );
      case 'rain':
      case 'drizzle':
        return (
          <div className="relative">
            <CloudRain 
              {...iconProps} 
              className={`${iconProps.className} text-weather-rainy animate-bounce-soft hover:animate-wiggle drop-shadow-lg`}
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-1 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        );
      case 'snow':
        return (
          <div className="relative">
            <CloudSnow 
              {...iconProps} 
              className={`${iconProps.className} text-weather-snowy animate-float hover:scale-110 drop-shadow-lg`}
            />
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-2 h-2 bg-white rounded-full absolute top-4 left-2 animate-bounce opacity-80" style={{ animationDelay: '0s' }}></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-6 right-3 animate-bounce opacity-60" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full absolute bottom-4 left-4 animate-bounce opacity-70" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        );
      case 'mist':
      case 'fog':
        return (
          <div className="relative">
            <Cloud 
              {...iconProps} 
              className={`${iconProps.className} text-gray-400 animate-float hover:scale-110 opacity-70 drop-shadow-lg`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
        );
      case 'wind':
        return (
          <Wind 
            {...iconProps} 
            className={`${iconProps.className} text-blue-400 animate-wiggle hover:scale-110 drop-shadow-lg`}
          />
        );
      default:
        return (
          <Sun 
            {...iconProps} 
            className={`${iconProps.className} text-weather-sunny animate-bounce-soft drop-shadow-lg`}
          />
        );
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      {getWeatherIcon()}
    </div>
  );
};

export default AnimatedWeatherIcon;
