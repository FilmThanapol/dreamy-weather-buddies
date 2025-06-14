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
  const iconProps = {
    size,
    className: `${className} transition-all duration-300`
  };

  const getWeatherIcon = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return (
          <div className="relative">
            <Sun 
              {...iconProps} 
              className={`${iconProps.className} text-yellow-400 animate-float-soft drop-shadow-md`}
            />
            <div className="absolute inset-0 animate-fade-pulse opacity-10">
              <Sun {...iconProps} className="text-yellow-200" />
            </div>
          </div>
        );

      case 'clouds':
      case 'cloudy':
        return (
          <div className="relative">
            <Cloud 
              {...iconProps} 
              className={`${iconProps.className} text-gray-400 animate-float-soft hover:scale-105 drop-shadow-md`}
            />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-fade-pulse opacity-50"></div>
          </div>
        );

      case 'rain':
      case 'drizzle':
        return (
          <div className="relative">
            <CloudRain 
              {...iconProps} 
              className={`${iconProps.className} text-blue-400 animate-float-soft drop-shadow-md`}
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div className="w-1 h-4 bg-blue-300 rounded-full animate-drip-fall" style={{ animationDelay: '0s' }}></div>
              <div className="w-1 h-3 bg-blue-200 rounded-full animate-drip-fall" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-4 bg-blue-300 rounded-full animate-drip-fall" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        );

      case 'snow':
        return (
          <div className="relative">
            <CloudSnow 
              {...iconProps} 
              className={`${iconProps.className} text-blue-200 animate-float-soft drop-shadow-md`}
            />
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-2 h-2 bg-white rounded-full absolute top-4 left-3 animate-drip-fall" style={{ animationDelay: '0s' }}></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-6 right-3 animate-drip-fall" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full absolute bottom-4 left-5 animate-drip-fall" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        );

      case 'mist':
      case 'fog':
        return (
          <div className="relative">
            <Cloud 
              {...iconProps} 
              className={`${iconProps.className} text-gray-300 animate-float-soft opacity-70 drop-shadow`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-fade-pulse"></div>
          </div>
        );

      case 'wind':
        return (
          <Wind 
            {...iconProps} 
            className={`${iconProps.className} text-blue-300 animate-float-soft drop-shadow-md`}
          />
        );

      default:
        return (
          <Sun 
            {...iconProps} 
            className={`${iconProps.className} text-yellow-400 animate-float-soft drop-shadow-md`}
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
