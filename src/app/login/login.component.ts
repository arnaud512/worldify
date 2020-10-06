import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    const hash = window.location.hash;
    if (hash) {
      const token = window.location.hash.split('&')[0].split('=')[1];
      this.setToken(token)
      this.router.navigate(['']);
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): string {
    return this.getToken();
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getAuthorization(): void {
    this.spotifyService.retrieveToken(window.location.origin);
  }

}
