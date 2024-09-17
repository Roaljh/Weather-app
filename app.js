const express = require('express');
const hbs = require('hbs')
const app = express();
const path = require('path');
const port = 4000
const viewPath = path.join(__dirname, './views')
const public = path.join(__dirname, './public')
const partial = path.join(__dirname, './partials')

const weather = require('./weather');
const geolocation =require('./geolocation');

// settings 
app.set('view engine', 'hbs')
app.set('views', viewPath)
app.use(express.static(public))
hbs.registerPartials(partial)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    res.render('weather')
})

app.get('/getweather', async (req, res) => {
    const { city, state, country } = req.query;
    try {
        const coords = await geolocation.getCoordinates(city, state, country);
        console.log(coords);
        
        if (coords) {
            const weatherData = await weather.getWeather(coords.lat, coords.lng);
            res.json({
                cityName: 'rohit nandha',
                temperature: weatherData.main.temp,
                condition: weatherData.weather[0].description
            });
        } else {
            res.status(404).send('Coordinates not found');
        }

    } catch (error){
        res.status(500).send('Internal server error');
    }
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    // logs a message when the server is running
})