import { Navbar } from "@/components/navbar";
import { getWeatherData } from "@/app/actions";
import { WeatherDisplay } from "@/components/weather-display";

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query || "London";
  let weatherData = null;
  let error = null;

  try {
    weatherData = await getWeatherData(query);
  } catch (err) {
    console.error("Error in page component:", err);
    error =
      err instanceof Error
        ? err.message
        : "Failed to fetch weather data. Please try again.";
  }

  return (
    <div className="min-h-screen bg-[url('/weather-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen backdrop-blur-sm bg-background/60 dark:bg-background/80">
        <Navbar />
        <div className="container mx-auto px-4 py-8 fade-in">
          {weatherData && typeof weatherData === "object" ? (
            <WeatherDisplay
              weatherData={weatherData}
              error={error}
              defaultCity={query}
            />
          ) : (
            <div className="max-w-5xl mx-auto p-6 rounded-xl glass-effect shadow-lg">
              <p className="text-red-500 font-medium">{error || "Invalid weather data format."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
