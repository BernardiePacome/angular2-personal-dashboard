import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  loc: string | undefined;
  currentWeather: any = {} as any;
  msg: string | undefined;
  weatherCondition: string | undefined;
  imgIconRef: string | undefined;

  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {
    this.weatherService.getClientIP().subscribe((res) => {
      const ip = res.ip;
      this.weatherService.getCurrentCityName(ip).subscribe((result) => {
        // console.log(result.city);
        // @ts-ignore
        const city = result.city;
        localStorage.setItem('location', city);
      });
    });
    this.getWeather(localStorage.getItem('location'));
  }

  ngOnInit(): void {}

  getWeather(loc: string | null): void {
    this.msg = '';
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc).subscribe(
      (res) => {
        this.currentWeather = res;
        console.log(this.currentWeather);

        this.weatherCondition = this.currentWeather.weather[0].description;
        console.log(this.weatherCondition);
        this.weatherCondition = 'clear sky';
        this.setWeatherIcon();
      },
      (err) => {
        if (err.error && err.error.message) {
          this.msg = err.error.message;
          return;
        }
      },
      () => {}
    );
  }

  setWeatherIcon(): void {
    switch (this.weatherCondition) {
      case 'clear sky':
        this.imgIconRef = 'assets/icons/art_clear.png';
        break;
    }
  }
}
