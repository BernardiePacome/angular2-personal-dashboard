import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { locationReducer } from './location-reducer';
import { WeatherService } from './services/weather.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { MusicService } from './services/music.service';
import { SoundcloudService } from './services/soundcloud.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    MusicPlayerComponent,
    TodoListComponent,
    ForecastComponent,
    ForecastCardComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    StoreModule.forRoot({
      loc: locationReducer,
    }),
    FormsModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatListModule,
    FontAwesomeModule,
  ],

  exports: [WeatherComponent],
  providers: [WeatherService, MusicService, SoundcloudService],
  bootstrap: [AppComponent],
})
export class AppModule {}
