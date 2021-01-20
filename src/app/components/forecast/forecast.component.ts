import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Forecast } from '../../models/forecast.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  forecasts: Forecast[] = [];

  constructor(private weatherService: WeatherService) {
    this.weatherService.getClientIP().subscribe((res) => {
      const ip = res.ip;
      this.weatherService.getCurrentCityName(ip).subscribe((result) => {
        // @ts-ignore
        const city = result.city;
        this.weatherService.getForecast(city).subscribe((forecast) => {
          for (let i = 0; i < forecast.list.length; i++) {
            if (i % 8 === 0) {
              const singleForecast = new Forecast();
              singleForecast.date = new Date(forecast.list[i].dt * 1000);
              singleForecast.temp = forecast.list[i].main.temp;
              singleForecast.weather = forecast.list[i].weather[0].main;

              console.log(singleForecast.weather);
              this.forecasts.push(singleForecast);
            }
          }
        });
      });
    });
  }

  ngOnInit(): void {}
}
