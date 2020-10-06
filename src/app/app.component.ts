import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
import { Router } from '@angular/router';
import { countryList } from './services/countryList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Worldify';
  selected = { code: 'FR', name: 'France'};
  isCollapsed = true;
  countryList = countryList;
  activeUrlIndex: Number;

  isAuthenticated() {
    this.spotifyService.isAuthenticated();
  }

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ){
    this.isCollapsed = true;
    this.setActivePage(this.router.url);
  }

  ngOnInit(){
    this.onPageChange();
    const code = localStorage.getItem('country') || 'FR';
    const selectedCountry = countryList.find(country => country.code === code);
    this.selected = selectedCountry;
  }

  select(country) {
    this.selected = country;
    localStorage.setItem('country', country.code);
    location.reload();
  }

  onPageChange() {
    this.router.events.subscribe((value: any) => {
      if (value.url) {
        this.setActivePage(value.url);
      }
    });
  }

  setActivePage(url: string) {
    if (this.router.url === '/'){
      this.activeUrlIndex = 0;
    } else if (url.includes('new-releases')) {
      this.activeUrlIndex = 1;
    } else if (url.includes('genres') || url.includes('playlists')) {
      this.activeUrlIndex = 2;
    } else {
      this.activeUrlIndex = -1;
    }
  }
}
