import "./style.css";
import { WeatherService } from "./meteo-service.js";
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, TimeScale } from "chart.js";
import 'chartjs-adapter-moment';

const service = new WeatherService();

service.getWeatherData()
    .then(weatherData => displayWeather(weatherData));   //*


// function displayWeather(weatherData) {

//     const temperaturePoints = getTemperaturePoints(weatherData);
//     const rainPoints = getRainPoints(weatherData);
//     const windPoints = getWindPoints(weatherData);

//     testChart("temperature-chart", temperaturePoints);
//     testChart("rain-chart", rainPoints);
//     testChart("wind-chart", windPoints);

//     const container = document.getElementById('app');  //*
//     container.innerHTML = "";  //*

//     for (const data of weatherData) {

//         const card = document.createElement('div');
//         card.classList.add('card');

//         const spanTime = document.createElement('span');
//         spanTime.textContent = "🕒 " + data.time;
//         card.appendChild(spanTime);

//         const spanRain = document.createElement('span');
//         spanRain.textContent = "🌧️ " + data.rain + " mm";
//         card.appendChild(spanRain);

//         const spanTemp = document.createElement('span');
//         spanTemp.textContent = "🌡️ " + data.temperature + "°C";
//         card.appendChild(spanTemp);

//         // const spanCode = document.createElement('span');
//         // spanCode.innerHTML = data.code;
//         // card.appendChild(spanCode);

//         const imgCode = document.createElement('img');
//         imgCode.src = "./icons/" + data.code + "d.png";
//         card.appendChild(imgCode);

//         const spanWind = document.createElement('span');
//         spanWind.textContent = "💨 " + data.wind + " km/h";
//         card.appendChild(spanWind);

//         container.appendChild(card);
//     }

// }
function displayWeather(weatherData) {

    // Divido i dati in gruppi da 24 ore
    const today = weatherData.slice(0, 24);
    const tomorrow = weatherData.slice(24, 48);
    const afterTomorrow = weatherData.slice(48, 72);

    // Prendo solo 7 ore per ogni giorno
    const today7 = today.slice(0, 7);
    const tomorrow7 = tomorrow.slice(0, 7);
    const afterTomorrow7 = afterTomorrow.slice(0, 7);

    // Mostro i grafici
    testChart("temperature-chart", getTemperaturePoints(weatherData));
    testChart("rain-chart", getRainPoints(weatherData));
    testChart("wind-chart", getWindPoints(weatherData));

    // Riempio i contenitori
    fillDayBox("day-1", today7, "Oggi");
    fillDayBox("day-2", tomorrow7, "Domani");
    fillDayBox("day-3", afterTomorrow7, "Dopodomani");

}

function getTemperaturePoints(weatherData) {  //*

    //COL CICLO FOR
    console.log("Weather data for temp", weatherData);

    const points = [];

    for (const data of weatherData) {
        const point = {
            x: data.time,
            y: data.temperature
        };
        points.push(point);
    }
    return points;

    //COL MAP (METODO DEGLI ARRAY)
    // return weatherData.map(data => ({  
    //     x: data.time,         //sull'asse x metto il tempo
    //     y: data.temperature   //sull'asse y metto la temperatura
    // }));
}

function getRainPoints(weatherData) {

    // return weatherData.map(data => {
    //     return {   
    //     x: data.time,     
    //     y: data.rain
    // }});

    return weatherData.map(data => ({   //*
        x: data.time,
        y: data.rain
    }));

}

function getWindPoints(weatherData) {
    return weatherData.map(data => ({
        x: data.time,
        y: data.wind
    }));
}

function testChart(canvasId, dataPoints) {

    console.log("Data points", dataPoints);


    //[{x:"2026-01-13T00:00", y:9},
    //{x:"2026-01-13T01:00", y:8},
    //{x:"2026-01-13T02:00", y:7},...]

    Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, TimeScale);

    //Chart.register è un metodo statico della classe Chart che serve per registrare i componenti che vogliamo usare nel grafico

    // const labels = ["marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre"]
    const labels = []
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: dataPoints,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'time',
                }
            }
        }
    };

    const canvas = document.getElementById(canvasId);

    new Chart(canvas, config)
}

function fillDayBox(id, dataArray, label) {

    const box = document.getElementById(id);
    const title = box.querySelector(".day-title");
    const cardsContainer = box.querySelector(".cards");

    // Ricavo la data del giorno
    const date = new Date(dataArray[0].time);

    // Formatto la data in stile italiano
    const formattedDate = date.toLocaleDateString("it-IT", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    // Imposto il titolo: Oggi (Mercoledì 14 gennaio)
    title.textContent = `${label} (${formattedDate})`;

    // Svuoto eventuali dati precedenti
    cardsContainer.innerHTML = "";

    // Creo i 7 quadri
    for (const data of dataArray) {

        const card = document.createElement("div");
        card.className = "card";
        card.style.position = "relative"; // necessario per il tooltip


        const img = document.createElement("img");
        img.src = "./icons/" + data.code + "d.png";
        card.appendChild(img);

        const hour = document.createElement("span");
        hour.textContent = new Date(data.time).toLocaleTimeString("it-IT", {
            hour: "2-digit",
            minute: "2-digit"
        });
        card.appendChild(hour);

        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";

        tooltip.textContent =
            `Temp: ${data.temperature}°C • ` +
            `Pioggia: ${data.rain}mm • ` +
            `Vento: ${data.wind} km/h`;

        card.appendChild(tooltip);


        cardsContainer.appendChild(card);
    }
}

