
import React from 'react';
import { Cloud, Sun } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LoadingSpinner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in-up">
      <div className="relative">
        <Sun className="text-yellow-400 animate-bounce-soft" size={48} />
        <Cloud className="text-blue-300 animate-float absolute -top-2 -right-2" size={32} />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          {t('fetchingWeather')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {t('gettingForecast')}
        </p>
      </div>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
