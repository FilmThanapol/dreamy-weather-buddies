
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchHistoryProps {
  history: string[];
  onCitySelect: (city: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onCitySelect }) => {
  const { t } = useLanguage();

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-4 animate-fade-in-up">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">
        {t('searchHistory')}
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {history.map((city, index) => (
          <Button
            key={index}
            onClick={() => onCitySelect(city)}
            variant="outline"
            size="sm"
            className="rounded-full bg-white/60 backdrop-blur-sm border border-pastel-blue hover:bg-pastel-blue hover:scale-105 transition-all duration-300 text-xs dark:bg-gray-800/60 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
