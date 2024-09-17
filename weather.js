const axios = require('axios');
delete require.cache[require.resolve('./geolocation')];
// const geolocation = require('./geolocation'); // Ensure the path is correct relative to the location of weather.js
const weatherAPIKey = 'd1108cea320b51ffaf5ac2decfaabc03'; // Replace with your actual OpenWeatherMap API key

async function getWeather(lat, lng) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${weatherAPIKey}`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        console.log(weatherData.main.temp);
        console.log(weatherData.weather[0].description);
        
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}
const lat = 40.7128; 
const lng = -74.0060;
getWeather(lat, lng);


// async function fetchWeather(city, state, country) {
//     try {
//         const coords = await geolocation.getCoordinates(city, state, country);
//         if (coords) {
//             const weatherData = await getWeather(coords.lat, coords.lng);
//             console.log("Temperature in celcius: ", weatherData.main.temp);
//             console.log("Description: ", weatherData.weather[0].description);
            
//             return weatherData;
//         } else {
//             console.log('No coordinates found for given location.');
//             return null;
//         }
//     } catch (error) {
//         console.error('Error in fetchWeather function:', error);
//         if (error.response) {
//         // Handle API response errors specifically
//             console.error("API responded with status code:", error.response.status);
//         } else if (error.request) {
//         // The request was made but no response was received
//             console.error("No response received:", error.request);
//         } else {
//         // Something happened in setting up the request
//             console.error("Error setting up API call:", error.message);
//         }
//         return null;
//     }
// }

// fetchWeather('New York', 'NY', 'USA');

module.exports = {
    // fetchWeather
    getWeather
}