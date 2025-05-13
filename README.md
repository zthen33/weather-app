# Weather Forecast App

A modern web application that provides real-time weather information for cities around the world. Built with Next.js, TypeScript, Tailwind CSS, and integrated with the OpenWeather API.

![Weather App Screenshot](public/weather-bg.jpg)

## Features

- **Real-time Weather Data**: Get current weather conditions including temperature, humidity, wind speed, and more
- **City-based Search**: Search for weather information by city name
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark/Light Mode**: Support for theme switching
- **User Authentication**: Sign up, login, and profile management
- **Location Saving**: Registered users can save their favorite locations
- **Beautiful UI**: Modern interface with weather condition icons and visual indicators

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: NextAuth.js
- **API**: OpenWeather API
- **Database**: Supabase

## Getting Started

### Prerequisites

- Node.js 18 or newer
- OpenWeather API key (get one at [OpenWeather](https://openweathermap.org/api))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   OPENWEATHER_API_KEY=your_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_key
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- Enter a city name in the search bar to get the current weather
- Sign up/login to save your favorite locations
- Switch between dark and light mode using the theme toggle in the navigation bar

## License

This project is licensed under the MIT License.

## Acknowledgments

- Weather data provided by [OpenWeather](https://openweathermap.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
