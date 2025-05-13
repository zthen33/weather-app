"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { MapPin, Trash2, Cloud, CloudRain, Sun, CloudSun } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getWeatherData } from "@/app/actions"

// Mock saved locations (in a real app, these would come from your database)
const mockSavedLocations = [
  { id: "1", name: "London", country: "GB" },
  { id: "2", name: "New York", country: "US" },
  { id: "3", name: "Tokyo", country: "JP" },
]

export default function SavedLocationsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [savedLocations, setSavedLocations] = useState(mockSavedLocations)
  const [weatherData, setWeatherData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWeatherForLocations() {
      setLoading(true)
      const weatherPromises = savedLocations.map(async (location) => {
        try {
          const data = await getWeatherData(`${location.name},${location.country}`)
          return { id: location.id, data }
        } catch (error) {
          console.error(`Error fetching weather for ${location.name}:`, error)
          return { id: location.id, error: true }
        }
      })

      const results = await Promise.all(weatherPromises)
      const weatherMap = {}
      results.forEach((result) => {
        weatherMap[result.id] = result.data
      })

      setWeatherData(weatherMap)
      setLoading(false)
    }

    if (savedLocations.length > 0) {
      fetchWeatherForLocations()
    } else {
      setLoading(false)
    }
  }, [savedLocations])

  const removeLocation = (id) => {
    setSavedLocations(savedLocations.filter((location) => location.id !== id))
    toast({
      title: "Location removed",
      description: "The location has been removed from your saved locations.",
    })
  }

  const getWeatherIcon = (condition) => {
    const code = condition?.toLowerCase() || ""

    if (code.includes("rain") || code.includes("drizzle")) {
      return <CloudRain className="h-8 w-8 text-blue-500" />
    } else if (code.includes("cloud")) {
      return <Cloud className="h-8 w-8 text-gray-500" />
    } else if (code.includes("clear")) {
      return <Sun className="h-8 w-8 text-yellow-500" />
    } else {
      return <CloudSun className="h-8 w-8 text-yellow-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Saved Locations</h1>
            <p className="text-gray-600 dark:text-gray-300">Quickly access weather for your favorite places</p>
          </header>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : savedLocations.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedLocations.map((location) => {
                const weather = weatherData[location.id]
                return (
                  <Card key={location.id} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>
                            {location.name}, {location.country}
                          </span>
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLocation(location.id)}
                          className="h-8 w-8 text-white hover:text-white hover:bg-blue-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove location</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      {weather ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {getWeatherIcon(weather.current.weather[0].description)}
                            <div className="ml-3">
                              <h3 className="text-2xl font-bold">{Math.round(weather.current.temp)}°C</h3>
                              <p className="text-gray-500 dark:text-gray-400 capitalize text-sm">
                                {weather.current.weather[0].description}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/?query=${encodeURIComponent(`${location.name},${location.country}`)}`}>
                              View Details
                            </a>
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                          Failed to load weather data
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <MapPin className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
                You haven&apos;t saved any locations yet
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Search for a city and click the heart icon to save it
              </p>
              <Button className="mt-4" asChild>
                <a href="/">Search Cities</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
