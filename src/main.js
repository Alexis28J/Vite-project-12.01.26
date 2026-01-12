import "./style.css";
import { WeatherService } from "./meteo-service.js";

const service = new WeatherService();

service.getData()
// .then(weatherData => displayWeather(weatherData));

// function displayWeather (weatherData) {

//         console.log('display', weatherData);

// }