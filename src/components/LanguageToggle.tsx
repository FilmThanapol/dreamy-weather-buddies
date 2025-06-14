
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      className="rounded-full bg-white/80 backdrop-blur-sm border-2 border-pastel-blue hover:bg-white/90 transition-all duration-300 hover:scale-110 dark:bg-gray-800/80 dark:border-gray-600 dark:hover:bg-gray-700/90 px-4 py-2 font-bold text-gray-700 dark:text-gray-300"
    >
      {language === 'en' ? 'ไทย' : 'EN'}
    </Button>
  );
};

export default LanguageToggle;
