const axios = require('axios')
const geocodeAPIkey = '0fe6526d54834c1b9f9b4774be224e9d';

async function getCoordinates(city, state, country) {
    const query = encodeURIComponent(`${city}, ${state}, ${country}`);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${geocodeAPIkey}`;
    try {
        const response = await axios.get(url);
        if (response.data && response.data.results && response.data.results.length > 0) {
            const firstResult = response.data.results[0];
            const coords = firstResult.geometry;
            return coords;
        } else {
            console.error('No coordinates found for given city, state, and country');
            return null;
        }
    } catch (error) {
        console.log('API Error', error);
        return null
    }
}

// function getCoordinates() {
//     console.log("This is a test function from geolocation.js");
//     return { lat: 40.7128, lng: -74.0060 };
// }

module.exports = {
    getCoordinates
}


