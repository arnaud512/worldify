import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { countryList } from './countryList';
import { BrowserStorageService } from './browser-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  CLIENT_ID = '2b09c6e30b4c4cc1acb5353c9a62ddab';

  uriRefreshToken = 'https://accounts.spotify.com/api/token';

  uriGetFeaturedPlaylists = 'https://api.spotify.com/v1/browse/featured-playlists?limit=20&country=';
  uriGetNewReleased = 'https://api.spotify.com/v1/browse/new-releases';
  uriGetGenres = 'https://api.spotify.com/v1/browse/categories';

  constructor(
    private http: HttpClient,
    private browserStorageService: BrowserStorageService
  ) { }

  getToken(): any {
    return this.browserStorageService.getLocal('token');
  }

  public isAuthenticated(): any {
    return this.getToken();
  }

  retrieveToken(origin): void {
    this.browserStorageService.removeLocal('token');
    const scopes = 'user-read-private';
    window.location.href = ('https://accounts.spotify.com/authorize/?'
      + 'client_id=' + this.CLIENT_ID
      + '&response_type=token'
      + '&redirect_uri=' + origin + '/callback/'
      + '&scope=' + scopes);
  }

  getFeaturedPlaylists(country): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.isAuthenticated()}`);
    return this.http.get<any>(this.uriGetFeaturedPlaylists + country, {headers});
  }

  getNewReleased(country, offset): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.isAuthenticated()}`);
    return this.http.get<any>(this.uriGetNewReleased
      + '?country=' + country
      + '&limit=50'
      + '&offset=' + (offset + 50),
      {headers});
  }

  getGenres(country): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.isAuthenticated()}`);
    return this.http.get<any>(this.uriGetGenres
      + '?country=' + country
      + '&limit=50'
      + '&locale=' + this.getLocale(country),
      {headers});
  }

  getPlaylistsById(id, country): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.isAuthenticated()}`);
    return this.http.get<any>(this.uriGetGenres + '/' + id + '/playlists'
      + '?country=' + country
      + '&limit=50',
      {headers});
  }

  getLocale(country): string {
    const countryObj = countryList.find(obj => obj.code === country);
    return countryObj.locale || 'us_EN';
  }
}
