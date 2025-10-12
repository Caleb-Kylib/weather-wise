🌦️ Weather-Wise

Weather-Wise is a simple and responsive weather web application that allows users to search for any city around the world and get real-time weather updates. It uses the OpenWeather API to display information such as temperature, humidity, wind speed, and weather conditions — all presented in a clean and user-friendly dashboard.

🚀 Features

🌍 City Search – Enter any city name to get up-to-date weather information.

🌤️ Real-Time Data – Displays temperature, humidity, wind speed, and weather conditions.

💡 Responsive UI – Designed to work seamlessly on both desktop and mobile devices.

🔒 Secure API Integration – API keys are safely stored using environment variables.

🎨 Modern Design – Includes a sleek landing page and an intuitive dashboard layout.

🧠 Tech Stack

Frontend: React + Vite

Styling: CSS / Tailwind CSS

API: OpenWeather API

Version Control: Git & GitHub

⚙️ Setup Instructions

Follow these steps to run the project locally:

Clone the repository

git clone https://github.com/Caleb-Kylib/weather-wise.git
cd weather-wise


Install dependencies

npm install


Create an environment file
In the root directory, create a .env file and add your API key:

VITE_OPENWEATHER_API_KEY=your_api_key_here


Run the development server

npm run dev


Open your browser and visit:

http://localhost:5173

🖼️ Pages Overview
🏠 Landing Page

Welcomes users to the app.

Provides an introduction and link to the dashboard.

📊 Dashboard Page

Allows users to input a city name.

Displays:

City name

Temperature (°C)

Humidity (%)

Wind speed (m/s)

Weather description and icon
