import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../services/spotify.service';
import { Router } from '@angular/router';
import { BrowserStorageService } from '../services/browser-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService,
    private browserStorageService: BrowserStorageService
  ) { }

  ngOnInit(): void {
    const hash = window.location.hash;
    if (hash) {
      const token = window.location.hash.split('&')[0].split('=')[1];
      this.setToken(token);
      this.router.navigate(['']);
    }
  }

  getToken(): string {
    return this.browserStorageService.getLocal('token');
  }

  public isAuthenticated(): string {
    return this.getToken();
  }

  setToken(token: string): void {
    this.browserStorageService.setLocal('token', token);
  }

  getAuthorization(): void {
    this.spotifyService.retrieveToken(window.location.origin);
  }

}
