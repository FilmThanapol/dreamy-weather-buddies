
import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, CloudDrizzle } from 'lucide-react';

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
          <Sun 
            {...iconProps} 
            className={`${iconProps.className} text-weather-sunny animate-bounce-soft hover:animate-wiggle`}
          />
        );
      case 'clouds':
      case 'cloudy':
        return (
          <Cloud 
            {...iconProps} 
            className={`${iconProps.className} text-weather-cloudy animate-float hover:scale-110`}
          />
        );
      case 'rain':
      case 'drizzle':
        return (
          <CloudRain 
            {...iconProps} 
            className={`${iconProps.className} text-weather-rainy animate-bounce-soft hover:animate-wiggle`}
          />
        );
      case 'snow':
        return (
          <CloudSnow 
            {...iconProps} 
            className={`${iconProps.className} text-weather-snowy animate-float hover:scale-110`}
          />
        );
      case 'mist':
      case 'fog':
        return (
          <CloudDrizzle 
            {...iconProps} 
            className={`${iconProps.className} text-gray-400 animate-float hover:scale-110`}
          />
        );
      case 'wind':
        return (
          <Wind 
            {...iconProps} 
            className={`${iconProps.className} text-blue-400 animate-wiggle hover:scale-110`}
          />
        );
      default:
        return (
          <Sun 
            {...iconProps} 
            className={`${iconProps.className} text-weather-sunny animate-bounce-soft`}
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
