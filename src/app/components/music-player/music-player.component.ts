import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit {
  title: string | undefined;
  backgroundStyle: any;
  tracks: any[] = [];

  constructor(private musicService: MusicService) {
    this.musicService.getPlaylistTracks().subscribe((tracks) => {
      this.tracks = tracks;
      this.handleRandom();
    });
  }

  ngOnInit(): void {
    // On song end
    //this.musicService.audio.onended = this.handleEnded.bind(this);
    // On play time update
    // this.musicService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
  }

  handleRandom(): void {
    // Pluck a song
    const randomTrack = this.musicService.randomTrack(this.tracks);
    // Play the plucked song
    this.musicService.play(randomTrack.stream_url);
    // Set the title property
    this.title = randomTrack.title;
    // Create a background based on the playing song
    this.backgroundStyle = this.composeBackgroundStyle(randomTrack.artwork_url);
  }

  composeBackgroundStyle(url: string): any {
    return {
      width: '100%',
      height: '600px',
      backgroundSize: 'cover',
      backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),   url(${this.musicService.xlArtwork(url)})`,
    };
  }
}
