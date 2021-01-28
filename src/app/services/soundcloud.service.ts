import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoundcloudService {

  clientId = 'XmvD0222mkoRiRKkf97v8i5K2FtAX5dH';
  url = 'https://api.soundcloud.com';
  constructor(
      private http: HttpClient
  ) { }

  get(url: string, attachClientId?: boolean): Observable<any> {
    let constructedUrl;
    attachClientId ? constructedUrl = this.prepareUrl(url) : constructedUrl = url;
    return this.http.get(this.prepareUrl(constructedUrl));
  }

  prepareUrl(url: string): string {
    // Attach client id to stream url
    return `${url}?client_id=${this.clientId}`;
  }
}
