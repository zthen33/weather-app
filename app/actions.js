"use server";

export async function getWeatherData(city) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    console.error("OpenWeather API key is missing");
    throw new Error("API configuration error");
  }

  try {
    // Get coordinates by city name
    console.log(`Fetching geo data for: ${city}`);
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        city
      )}&limit=1&appid=${apiKey}`,
      { cache: "no-store" }
    );

    if (!geoResponse.ok) {
      console.error(
        `Geo API error: ${geoResponse.status} ${geoResponse.statusText}`
      );
      throw new Error(`Location API error: ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json();

    if (!geoData.length) {
      console.error("City not found in geo data");
      throw new Error("City not found");
    }

    const { lat, lon, name, country } = geoData[0];
    console.log(`Found coordinates: ${lat}, ${lon} for ${name}, ${country}`);

    // Get current weather and forecast
    console.log(`Fetching weather data for coordinates: ${lat}, ${lon}`);
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      { cache: "no-store" }
    );

    if (!weatherResponse.ok) {
      console.error(
        `Weather API error: ${weatherResponse.status} ${weatherResponse.statusText}`
      );
      throw new Error(`Weather API error: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();
    console.log("Weather data fetched successfully");

    // Format the data for our frontend
    return {
      current: {
        name,
        country,
        dt: weatherData.dt,
        temp: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        wind_speed: weatherData.wind.speed,
        clouds: weatherData.clouds.all,
        weather: weatherData.weather,
      },
      forecast: {
        dt: weatherData.dt,
        temp: weatherData.main.temp,
        weather: weatherData.weather,
      },
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error(error.message || "Failed to fetch weather data");
  }
}
