import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
import { Router } from '@angular/router';
import { countryList } from './services/countryList';
import { BrowserStorageService } from './services/browser-storage.service';

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
  filteredCountries = countryList;
  searchContent: string = '';
  activeUrlIndex: number;

  isAuthenticated() {
    this.spotifyService.isAuthenticated();
  }

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private browserStorageService: BrowserStorageService
  ){
    this.isCollapsed = true;
    this.setActivePage(this.router.url);
  }

  ngOnInit(){
    this.onPageChange();
    const code = this.browserStorageService.getLocal('country') || 'FR';
    const selectedCountry = countryList.find(country => country.code === code);
    this.selected = selectedCountry;
  }

  select(country) {
    this.selected = country;
    this.browserStorageService.setLocal('country', country.code);
    location.reload();
  }

  searchCountry() {
    const searchContent = this.searchContent.toLowerCase();

    this.filteredCountries = this.countryList.filter((countryItem) => {
      return countryItem.name.toLowerCase().indexOf(searchContent) > -1;
    });
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
