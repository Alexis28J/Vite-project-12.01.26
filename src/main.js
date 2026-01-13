import "./style.css";
import { WeatherService } from "./meteo-service.js";

const service = new WeatherService();

service.getWeatherData()
.then(weatherData => displayWeather(weatherData));


function displayWeather(weatherData) {

const container = document.getElementById('app');  //*
container.innerHTML = "";  //*

for (const data of weatherData) {   
    
const card = document.createElement('div');

const spanTime = document.createElement('span');
spanTime.innerHTML = data.time;
card.appendChild(spanTime);

const spanRain = document.createElement('span');
spanRain.innerHTML = data.rain;
card.appendChild(spanRain);

const spanTemp = document.createElement('span');
spanTemp.innerHTML = data.temperature;
card.appendChild(spanTemp);

const spanCode = document.createElement('span');
spanCode.innerHTML = data.code;
card.appendChild(spanCode);

const spanWind = document.createElement('span');
spanWind.innerHTML = data.wind;
card.appendChild(spanWind);

container.appendChild(card);
}

}