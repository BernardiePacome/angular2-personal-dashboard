import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from '../../models/forecast.model';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss'],
})
export class ForecastCardComponent implements OnInit {
  @Input() forecast: Forecast = new Forecast();

  imgIconRef: string | undefined;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.imgIconRef = this.weatherService.getWeatherIcon(this.forecast.weather);
  }
}
