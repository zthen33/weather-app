"use client";

import { useState } from "react";
import {
  Search,
  Cloud,
  CloudRain,
  Sun,
  CloudSun,
  Wind,
  Droplets,
  MapPin,
  Heart,
  CloudSnow,
  CloudFog,
  CloudLightning,
  Thermometer,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWeatherData } from "@/app/actions";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface CurrentWeather {
  name: string;
  country: string;
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  clouds: number;
  weather: WeatherCondition[];
}

interface ForecastWeather {
  dt: number;
  temp: number;
  weather: WeatherCondition[];
}

interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastWeather;
}

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  error: string | null;
  defaultCity: string;
}

export function WeatherDisplay({
  weatherData: initialWeatherData,
  error: initialError,
  defaultCity,
}: WeatherDisplayProps) {
  const [city, setCity] = useState(defaultCity || "");
  const [weatherData, setWeatherData] = useState(initialWeatherData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveLocation = async () => {
    if (!session) {
      toast({
        title: "Login required",
        description: "Please login to save locations",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real app, you would save this to your database
      toast({
        title: "Location saved",
        description: `${weatherData?.current.name} has been added to your saved locations.`,
      });
    } catch (err) {
      console.error("Error saving location:", err);
      toast({
        title: "Error",
        description: "Failed to save location. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getWeatherIcon = (condition: string) => {
    const code = condition?.toLowerCase() || "";

    if (code.includes("rain") || code.includes("drizzle")) {
      return <CloudRain className="h-16 w-16 text-blue-500" />;
    } else if (code.includes("cloud")) {
      return <Cloud className="h-16 w-16 text-gray-500" />;
    } else if (code.includes("clear")) {
      return <Sun className="h-16 w-16 text-yellow-500" />;
    } else if (code.includes("partly")) {
      return <CloudSun className="h-16 w-16 text-yellow-400" />;
    } else if (code.includes("snow")) {
      return <CloudSnow className="h-16 w-16 text-blue-200" />;
    } else if (code.includes("fog") || code.includes("mist")) {
      return <CloudFog className="h-16 w-16 text-gray-400" />;
    } else if (code.includes("thunder") || code.includes("lightning")) {
      return <CloudLightning className="h-16 w-16 text-purple-500" />;
    } else {
      return <CloudSun className="h-16 w-16 text-gray-400" />;
    }
  };

  const formatDate = (dt: number) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="text-center mb-8 fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-3">
          Weather Forecast
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get real-time weather updates for any location around the world
        </p>
      </header>

      <div className="tailwind-test mb-4 text-center">
        This element should have blue background and rounded corners if Tailwind
        is working properly.
      </div>

      <Card className="overflow-hidden glass-effect shadow-lg border-0 fade-in">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pl-10 bg-white/70 dark:bg-gray-800/70 border-0 shadow-sm"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6"
            >
              {loading ? (
                <>
                  <span className="animate-pulse">Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-xl shadow-sm fade-in">
          <p className="flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </p>
        </div>
      )}

      {weatherData && (
        <div className="space-y-8 staggered-fade-in">
          {/* Current Weather */}
          <Card className="overflow-hidden weather-card border-0 shadow-lg">
            <CardHeader className="weather-gradient">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl md:text-3xl flex items-center text-white">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>
                    {weatherData.current.name}, {weatherData.current.country}
                  </span>
                </CardTitle>
                {session && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={saveLocation}
                    className="text-white hover:text-white hover:bg-blue-700"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Save location</span>
                  </Button>
                )}
              </div>
              <CardDescription className="text-blue-100">
                {formatDate(weatherData.current.dt)}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-white/90 dark:bg-gray-800/90">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <div className="icon-container">
                    {weatherData.current.weather &&
                    weatherData.current.weather.length > 0 ? (
                      getWeatherIcon(weatherData.current.weather[0].description)
                    ) : (
                      <CloudSun className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  <div className="ml-5">
                    <h3 className="text-5xl font-bold text-gray-800 dark:text-white">
                      {Math.round(weatherData.current.temp)}°C
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 capitalize text-lg mt-1">
                      {weatherData.current.weather &&
                      weatherData.current.weather.length > 0
                        ? weatherData.current.weather[0].description
                        : "Unknown"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                  <div className="flex items-center">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2 mr-3">
                      <Thermometer className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Feels like
                      </p>
                      <p className="font-medium">
                        {Math.round(weatherData.current.feels_like)}°C
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2 mr-3">
                      <Droplets className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Humidity
                      </p>
                      <p className="font-medium">
                        {weatherData.current.humidity}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2 mr-3">
                      <Wind className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Wind
                      </p>
                      <p className="font-medium">
                        {Math.round(weatherData.current.wind_speed)} m/s
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2 mr-3">
                      <Cloud className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Clouds
                      </p>
                      <p className="font-medium">
                        {weatherData.current.clouds}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5-Day Forecast */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              5-Day Forecast
            </h2>
            <div className="text-center p-6 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-sm">
              <div className="py-8">
                <Cloud className="h-16 w-16 text-blue-300 dark:text-blue-400 mx-auto mb-4 opacity-70" />
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-lg">
                  5-day forecast data is currently unavailable.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please check back later for the extended forecast.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!weatherData && !loading && !error && (
        <div className="text-center p-16 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-sm fade-in">
          <Cloud className="h-20 w-20 text-blue-300 dark:text-blue-400 mx-auto mb-6 opacity-70" />
          <h3 className="text-2xl font-medium text-gray-600 dark:text-gray-300 mb-3">
            Enter a city name to get the weather forecast
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Get accurate weather details including temperature, humidity, wind
            speed and more
          </p>
        </div>
      )}
    </div>
  );
}
