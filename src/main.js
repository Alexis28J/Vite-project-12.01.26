import "./style.css";
import { WeatherService } from "./meteo-service";

const service = new WeatherService();

service.getData()
.then(weatherData => displayWeather(weatherData));

function displayWeather (weatherData) {

        console.log('display', weatherData);


}