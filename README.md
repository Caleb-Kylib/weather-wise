
🌤️ Weather Wise

Weather Wise is a modern, responsive weather web application built with React and Tailwind CSS. It provides accurate weather forecasts using data from the OpenWeatherMap API, including current, hourly, and 5-day forecasts. Users can search for any city, toggle between Celsius and Fahrenheit, and save their favorite locations for quick access.

🚀 Features

🌍 City Search – Enter any city name to get up-to-date weather information.

🌤️ Real-Time Data – Displays temperature, humidity, wind speed, and weather conditions.

🕒 Hourly Forecast – Displays detailed hourly weather data throughout the day.

📅 5-Day Forecast – Shows weather trends for the next five days.

❤️ Favorites Management – Save favorite cities for quick future access.

🌡️ Unit Toggle – Switch easily between Celsius (°C) and Fahrenheit (°F).

🔄 Auto-Refresh – Dashboard automatically updates weather data every few minutes.

🔔 Notifications – Uses React Hot Toast for clean error handling and success alerts.

📱 Responsive Design – Fully optimized for mobile, tablet, and desktop devices using Tailwind CSS.

🔒 Secure API Integration – API keys are safely stored using environment variables.

🎨 Modern UI – Includes a sleek landing page, intuitive dashboard, and favorites page.

⚡ Fast & Deployed – Built with Vite for blazing-fast performance and deployed via Vercel.

🧠 Tech Stack
Category	Technology
Frontend	React + Vite
Styling	Tailwind CSS
API	OpenWeatherMap API
Notifications	React Hot Toast
Version Control	Git & GitHub
Deployment	Vercel
⚙️ Setup Instructions

Follow these steps to run the project locally:

1️⃣ Clone the repository
git clone https://github.com/Caleb-Kylib/weather-wise.git
cd weather-wise

2️⃣ Install dependencies
npm install

3️⃣ Add your API key

Create a .env file in the project root and add your OpenWeather API key:

VITE_OPENWEATHER_API_KEY=your_api_key_here

4️⃣ Run the development server
npm run dev

5️⃣ Build for production
npm run build

📊 Dashboard Page

The dashboard allows users to input a city name and view:

🏙️ City name

🌡️ Temperature (°C / °F)

💧 Humidity (%)

🌬️ Wind speed (m/s)

☁️ Weather description and icon

⭐ “Save as Favorite” button

Additionally:

Includes hourly and 5-day forecasts displayed in well-styled weather cards.

Data automatically refreshes every few minutes or via a manual refresh button.

💾 Favorites Page

Displays all saved or favorite cities.

Each card shows the city name, temperature, and a brief weather summary.

Background image with a clouds theme for an elegant look.
