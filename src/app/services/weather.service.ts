import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Observable } from 'rxjs';
const apiKey: string = environment.apiKey;
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrentCityName(ip: string): Observable<object> {
    return this.http.get('http://ipinfo.io/' + ip + '?token=bd0f890aaaf348');
  }

  getCurrentWeather(loc: string | null): Observable<object> {
    return this.http.get(
      `${environment.apiUrl}/weather?q=${loc}&appid=${apiKey}`
    );
  }

  getForecast(loc: string): Observable<any> {
    console.log();
    return this.http.get(`${environment.apiUrl}/forecast?q=${loc}&appid=${apiKey}`);
  }

  getClientIP(): Observable<any> {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  getWeatherIcon(condition: string | undefined): string {
    switch (condition) {
      case 'Clear':
        return 'assets/icons/art_clear.png';
      case 'Clouds':
        return 'assets/icons/art_clouds.png';
      case 'Rain':
        return 'assets/icons/art_rain.png';
      case 'Mist':
        return 'assets/icons/art_mist.png';
      case 'Snow':
        return 'assets/icons/art_snow.png';
      default:
        console.log('no icon')
        return 'assets/icons/art_rain.png';
    }
  }
}
