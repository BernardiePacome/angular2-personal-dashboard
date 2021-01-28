import { Injectable } from '@angular/core';
import { SoundcloudService } from './soundcloud.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  audio: any;

  constructor(private soundcloudService: SoundcloudService) {
    this.audio = new Audio();
  }

  load(url: string): void {
    this.audio.src = this.soundcloudService.prepareUrl(url);
    this.audio.load();
  }

  play(url: string): void {
    this.load(url);
    this.audio.play();
  }

  getPlaylistTracks(): Observable<any> {
    // Request for a playlist via Soundcloud using a client id
    return this.soundcloudService
      .get('https://api.soundcloud.com/playlists/1198637497', true)
      .pipe(
        map((res) => res.json()),
        map((data) => data.tracks)
      );
  }

  randomTrack(tracks: any): any {
    const trackLength = tracks.length;
    // Pick a random number
    const randomNumber = Math.floor(Math.random() * trackLength + 1);
    // Return a random track
    return tracks[randomNumber];
  }

  formatTime(seconds: any): string {
    let minutes: any = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : '0' + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    return minutes + ':' + seconds;
  }

  findTracks(value: any): Observable<any> {
    return this.soundcloudService
      .get(
        `${this.soundcloudService.prepareUrl(
          'https://api.soundcloud.com/tracks'
        )}&q=${value}`,
        false
      )
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((res) => res.json())
      );
  }

  xlArtwork(url: string): string {
    return url.replace(/large/, 't500x500');
  }
}
