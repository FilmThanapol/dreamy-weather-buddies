import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchHistory from "@/components/SearchHistory";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import {
  fetchWeatherData,
  fetch7DayForecast,
  WeatherResponse,
  ForecastResponse,
} from "@/services/weatherService";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useLanguage } from "@/contexts/LanguageContext";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  sunrise?: string;
  sunset?: string;
  visibility?: number;
}

interface ForecastDay {
  date: string;
  condition: string;
  description: string;
  tempMin: number;
  tempMax: number;
}

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const { history, addToHistory } = useSearchHistory();
  const { toast } = useToast();
  const { t } = useLanguage();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setWeatherData(null);
    setForecastData([]);

    try {
      console.log("Starting weather search for:", city);

      // Fetch current weather
      const data: WeatherResponse = await fetchWeatherData(city);

      const transformedData: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed * 3.6, // Convert m/s to km/h
        feelsLike: data.main.feels_like,
        sunrise: data.sys.sunrise ? formatTime(data.sys.sunrise) : undefined,
        sunset: data.sys.sunset ? formatTime(data.sys.sunset) : undefined,
        visibility: data.visibility,
      };

      console.log("Transformed weather data:", transformedData);
      setWeatherData(transformedData);
      addToHistory(city);

      // Fetch 7-day forecast
      try {
        const forecastResponse: ForecastResponse = await fetch7DayForecast(
          city
        );

        // Group by day and take one forecast per day
        const dailyForecasts: { [key: string]: ForecastDay } = {};

        forecastResponse.list.forEach((item) => {
          const date = formatDate(item.dt);
          if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
              date,
              condition: item.weather[0].main,
              description: item.weather[0].description,
              tempMin: item.main.temp_min,
              tempMax: item.main.temp_max,
            };
          } else {
            // Update min/max temperatures
            dailyForecasts[date].tempMin = Math.min(
              dailyForecasts[date].tempMin,
              item.main.temp_min
            );
            dailyForecasts[date].tempMax = Math.max(
              dailyForecasts[date].tempMax,
              item.main.temp_max
            );
          }
        });

        const forecastArray = Object.values(dailyForecasts).slice(0, 7);
        setForecastData(forecastArray);
      } catch (forecastError) {
        console.warn("Could not fetch forecast data:", forecastError);
      }

      toast({
        title: `${t("weatherLoaded")}`,
        description: `${t("currentWeather")} ${transformedData.city}`,
      });
    } catch (error) {
      console.error("Weather search error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch weather data";

      toast({
        title: t("errorOops"),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header with controls */}
        <div className="text-center mb-8 animate-fade-in-up relative">
          <div className="absolute top-0 right-0 flex gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 inline-block">
            {t("appTitle").replace("🌈", "")}
            <span className="text-white">🌈</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
            {t("appSubtitle")}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <SearchHistory history={history} onCitySelect={handleSearch} />
        </div>

        {/* Content Area */}
        <div className="flex justify-center">
          {isLoading ? (
            <LoadingSpinner />
          ) : weatherData ? (
            <div className="w-full max-w-4xl">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                  <TabsTrigger value="today" className="rounded-full">
                    {t("today")}
                  </TabsTrigger>
                  <TabsTrigger value="forecast" className="rounded-full">
                    {t("forecast7day")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="today">
                  <WeatherCard weatherData={weatherData} />
                </TabsContent>

                <TabsContent value="forecast">
                  {forecastData.length > 0 ? (
                    <ForecastCard forecast={forecastData} />
                  ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      {t("fetchingWeather")}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="text-center space-y-4 animate-fade-in-up">
              <div className="text-6xl mb-4">🌤️</div>
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                {t("readyForMagic")}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {t("searchPrompt")}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400 dark:text-gray-500">
          <p className="text-sm">{t('footerNote')}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
