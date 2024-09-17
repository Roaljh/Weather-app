var headers = new Headers();
headers.append("X-CSCAPI-KEY", "TnhkcGRwNDR5NEdQcWFZd2xGMXhJT3FKbnBGSXBzVW1MT0o5a0tESA==");

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

        // Fetch countries and populate country dropdown
fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((result) => {
        console.log("Country API Response:", result); // Debugging line

        var countryDrop = '<option value="none">--Select Country--</option>'; // Add default option
        result.forEach(element => {
            countryDrop += `<option value="${element.iso2}" >${element.name}</option>`;
        });
        document.getElementById("country").innerHTML = countryDrop;
    })
    .catch(error => {
        console.error('Error fetching countries:', error); // Log any error
    });

        // Function to load states when a country is selected
function loadStates(countryCode) {
    if (countryCode === 'none') {
                // If "none" is selected, clear the state and city dropdown
        document.getElementById("state").innerHTML = '<option value="none">--Select State--</option>';
        document.getElementById("city").innerHTML = '<option value="none">--Select City--</option>';
        return;
    }

            // Fetch states based on selected country
    fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            console.log("State API Response:", result); // Debugging line

            if (result.length === 0) {
                        // No states for this country, directly load cities
                loadCitiesWithoutState(countryCode);
            } else {
                        // Populate the state dropdown
                var stateDrop = '<option value="none">--Select State--</option>'; // Add default option
                result.forEach(state => {
                    stateDrop += `<option value="${state.iso2}" >${state.name}</option>`;
                });
                document.getElementById("state").innerHTML = stateDrop;
                document.getElementById("city").innerHTML = '<option value="none">--Select City--</option>'; // Clear city dropdown
            }
        })
        .catch(error => console.error('Error fetching states:', error));
}

        // Function to load cities for countries without states
function loadCitiesWithoutState(countryCode) {
    console.log("Loading cities for country without states:", countryCode); // Debugging line

            // Fetch cities directly from the country
    fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/cities`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            console.log("City API Response (no states):", result); // Debugging line
            var cityDrop = '<option value="none">--Select City--</option>'; // Add default option
            result.forEach(city => {
                cityDrop += `<option value="${city.name}" >${city.name}</option>`;
            });
            document.getElementById("city").innerHTML = cityDrop;
        })
        .catch(error => console.error('Error fetching cities:', error));
}

        // Function to load cities when a state is selected
function loadCities(stateCode) {
    const countryCode = document.getElementById("country").value;
    console.log("Selected Country Code:", countryCode); // Debugging line
    console.log("Selected State Code:", stateCode); // Debugging line

    if (stateCode === 'none') {
                // If "none" is selected, clear the city dropdown
        document.getElementById("city").innerHTML = '<option value="none">--Select City--</option>';
        return;
    }

            // Fetch cities based on selected state and country
    fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            console.log("City API Response:", result); // Debugging line
            var cityDrop = '<option value="none">--Select City--</option>'; // Add default option
            result.forEach(city => {
                cityDrop += `<option value="${city.name}" >${city.name}</option>`;
            });
            document.getElementById("city").innerHTML = cityDrop;
        })
        .catch(error => console.error('Error fetching cities:', error));
}

function fetchWeatherData() {
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;

    // Check if a valid city is selected
    if (city && city !== "none") {
        fetch(`/getWeather?city=${city}&state=${state}&country=${country}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('location').textContent = city || 'Unknown';
                document.getElementById('temperature').textContent = data.temperature || '-';
                document.getElementById('condition').textContent = data.condition || 'Unknown';
                // displayWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                document.getElementById('location').textContent = 'Error';
                document.getElementById('temperature').textContent = '-';
                document.getElementById('condition').textContent = 'Could not fetch data';
            });
    } else {
        document.getElementById('weatherResults').innerHTML = 'Please select a city.';
    }
}



// function displayWeatherData(data) {
//     const weatherDiv = document.getElementById('weather-widget');
//     if (data && data.temperature) { // Ensure that data is not empty
//         weatherDiv.innerHTML = `
//             <p>Location: ${data.cityName}</p>
//             <p>Temperature: ${data.temperature}°C</p>
//             <p>Condition: ${data.condition}</p>
//         `;
//     } else {
//         weatherDiv.innerHTML = 'Weather data not available.';
//     }
// }
