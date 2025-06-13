
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cloud } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter city name... 🌍"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 text-lg rounded-2xl border-2 border-pastel-blue bg-white/80 backdrop-blur-sm focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder:text-gray-400"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="w-full py-3 text-lg font-semibold rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Cloud className="animate-bounce-soft" size={20} />
              <span>Searching...</span>
            </div>
          ) : (
            'Get Weather ✨'
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
