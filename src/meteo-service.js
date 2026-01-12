export class WeatherService {

    static url = "https://api.open-meteo.com/v1/forecast?latitude=44.411&longitude=8.896&hourly=temperature_2m,rain,weather_code,wind_speed_10m";

    constructor() {}

    getData (){
        return fetch(WeatherService.url) 
        .then(resp => resp.json())
        .then(result => result);
    }
}