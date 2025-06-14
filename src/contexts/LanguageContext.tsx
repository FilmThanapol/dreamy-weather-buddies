
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'th';

interface Translations {
  [key: string]: {
    en: string;
    th: string;
  };
}

const translations: Translations = {
  appTitle: {
    en: 'Cute Weather ☀️',
    th: 'สภาพอากาศน่ารัก ☀️'
  },
  appSubtitle: {
    en: 'Your adorable weather companion 🌈',
    th: 'เพื่อนคู่ใจสภาพอากาศของคุณ 🌈'
  },
  searchPlaceholder: {
    en: 'Enter city name... 🌍',
    th: 'ใส่ชื่อเมือง... 🌍'
  },
  getWeather: {
    en: 'Get Weather ✨',
    th: 'ดูสภาพอากาศ ✨'
  },
  searching: {
    en: 'Searching...',
    th: 'กำลังค้นหา...'
  },
  fetchingWeather: {
    en: 'Fetching weather data...',
    th: 'กำลังดึงข้อมูลสภาพอากาศ...'
  },
  gettingForecast: {
    en: '☁️ Getting the latest forecast ☁️',
    th: '☁️ กำลังดึงพยากรณ์อากาศล่าสุด ☁️'
  },
  readyForMagic: {
    en: 'Ready for weather magic? ✨',
    th: 'พร้อมสำหรับเวทมนตร์สภาพอากาศ? ✨'
  },
  searchPrompt: {
    en: 'Search for any city to see its current weather!',
    th: 'ค้นหาเมืองใดๆ เพื่อดูสภาพอากาศปัจจุบัน!'
  },
  humidity: {
    en: 'Humidity 💧',
    th: 'ความชื้น 💧'
  },
  windSpeed: {
    en: 'Wind Speed 💨',
    th: 'ความเร็วลม 💨'
  },
  feelsLike: {
    en: 'Feels like',
    th: 'รู้สึกเหมือน'
  },
  weatherLoaded: {
    en: 'Weather data loaded! 🌤️',
    th: 'โหลดข้อมูลสภาพอากาศแล้ว! 🌤️'
  },
  currentWeather: {
    en: 'Current weather for',
    th: 'สภาพอากาศปัจจุบันของ'
  },
  errorOops: {
    en: 'Oops! 😔',
    th: 'อุ๊ปส์! 😔'
  },
  searchHistory: {
    en: 'Recent searches',
    th: 'การค้นหาล่าสุด'
  },
  today: {
    en: 'Today',
    th: 'วันนี้'
  },
  forecast7day: {
    en: '7-Day Forecast',
    th: 'พยากรณ์ 7 วัน'
  },
  sunrise: {
    en: 'Sunrise 🌅',
    th: 'พระอาทิตย์ขึ้น 🌅'
  },
  sunset: {
    en: 'Sunset 🌇',
    th: 'พระอาทิตย์ตก 🌇'
  },
  uvIndex: {
    en: 'UV Index ☀️',
    th: 'ดัชนี UV ☀️'
  },
  visibility: {
    en: 'Visibility 👁️',
    th: 'ทัศนวิสัย 👁️'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
