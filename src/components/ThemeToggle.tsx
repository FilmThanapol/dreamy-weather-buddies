
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="rounded-full bg-white/80 backdrop-blur-sm border-2 border-pastel-blue hover:bg-white/90 transition-all duration-300 hover:scale-110 dark:bg-gray-800/80 dark:border-gray-600 dark:hover:bg-gray-700/90"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-600 animate-wiggle" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500 animate-bounce-soft" />
      )}
    </Button>
  );
};

export default ThemeToggle;
