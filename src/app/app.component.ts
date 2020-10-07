import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
import { Router } from '@angular/router';
import { countryList } from './services/countryList';
import { CountryListElement } from './dtos/country-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Worldify';
  selected: CountryListElement = { code: 'FR', name: 'France', isPrimary: true};
  isCollapsed = true;
  countryList = countryList;
  filteredCountries: CountryListElement[] = countryList;
  searchContent = '';
  activeUrlIndex: number;

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
    const currIndex = +localStorage.getItem('currIndex');
    this.filteredCountries[currIndex].isPrimary = true;
    // makes selected country top of list
    this.filteredCountries = this.filteredCountries.sort((x, y) => (x.isPrimary === y.isPrimary) ? 0 : x ? -1 : 1);
  }

  select(selectedCountry: CountryListElement) {
    // makes currently selected country primary
    const currentCountryIndex = this.filteredCountries.findIndex(country => country.code === selectedCountry.code);
    this.filteredCountries[currentCountryIndex].isPrimary = true;

    // resets isPrimary field of previously selected country
    const previousCountryIndex = this.filteredCountries.findIndex(country => country.code === this.selected.code);
    this.filteredCountries[previousCountryIndex].isPrimary = false;

    this.selected = selectedCountry;
    localStorage.setItem('country', selectedCountry.code);
    localStorage.setItem('currIndex', currentCountryIndex.toString());
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
