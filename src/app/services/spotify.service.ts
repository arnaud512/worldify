import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  CLIENT_ID = '2b09c6e30b4c4cc1acb5353c9a62ddab';

  uriGetFeaturedPlaylists = 'https://api.spotify.com/v1/browse/featured-playlists?country=FR&limit=20'
  uriRefreshToken = 'https://accounts.spotify.com/api/token'

  constructor(
    private http: HttpClient
  ) { }

  getToken() {
    return localStorage.getItem('token');
  }

  public isAuthenticated() {
    return this.getToken();
  }

  retrieveToken(origin) {
    localStorage.removeItem('token');
    const scopes = 'user-read-private';
    window.location.href = ('https://accounts.spotify.com/authorize/?'
      + 'client_id=' + this.CLIENT_ID
      + '&response_type=token'
      + '&redirect_uri=' + origin + "/callback/"
      + '&scope=' + scopes);
  }

  getFeaturedPlaylists() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.isAuthenticated()}`);
    return this.http.get<any>(this.uriGetFeaturedPlaylists, {headers: headers});
  }
}
