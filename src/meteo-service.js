export class WeatherService {  //*

    static url = "https://api.open-meteo.com/v1/forecast?latitude=44.411&longitude=8.896&hourly=temperature_2m,rain,weather_code,wind_speed_10m";

    constructor() { }

    getWeatherData() {      //* 
        return fetch(WeatherService.url)   //*
            .then(resp => resp.json()) //*
            .then(data => this.transformData(data)) //*
            //.then(transformedData => console.log(transformedData));  //* 
            .then(transformedData => transformedData);  //* 
    }

    transformData(data) {   //* 

        //FATTO INSIEME A EVELYN IN CLASSE (12.01.2026)
        //    fetch(WeatherService.url)
        //    .then(resp => resp.json())
        //    .then(data => {
        //     const times = data.hourly.time;
        //     const temperatures = data.hourly.temperature_2m;
        //     const rains = data.hourly.rain;
        //     const codes = data.hourly.weather_code;
        //     const winds = data.hourly.wind_speed_10m;

        //     const result = times.map((time, index) => ({
        //         time, 
        //         temperature: temperatures[index],
        //         rain: rains[index],
        //         code: codes[index],
        //         wind: winds[index]
        //     }));

        //     console.log(result);

        //    })

        //FATTO DAL PROF. IN CLASSE (13.01.2026)
        console.log("Dati dell'API", data);

        //*
        const hourlyData = data.hourly;
        //console.log("Solo i dati orari", hourlyData);   

        const times = hourlyData.time;
        //console.log("Orari", times);

        const temperatures = hourlyData.temperature_2m;
        //console.log("Temperature", temperatures);

        const rains = hourlyData.rain;
        //console.log("Rain", rains);

        const codes = hourlyData.weather_code;
        //console.log("Codes", codes);

        const winds = hourlyData.wind_speed_10m;
        //console.log("winds", winds);

        const newArray = [];

        for (let i = 0; i < times.length; i++) {   //usiamo times.length perché è l'array più lungo
            const time = times[i];
            const temperature = temperatures[i];
            const rain = rains[i];
            const code = codes[i];
            const wind = winds[i];

            // const hourData = {  //*
            //     time: time,  
            //     temperature: temperature,
            //     rain: rain,
            //     code: code,
            //     wind: wind
            // }

            const hourData = {  //* va bene scriverlo anche in questo modo 
                time,
                temperature,
                rain,
                code,
                wind
            }
            newArray.push(hourData);
        }
        return newArray;
    }

}