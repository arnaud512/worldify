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
  filteredCountries = countryList;
  searchContent: string = '';

  isAuthenticated() {
    this.spotifyService.isAuthenticated();
  }

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ){
    this.isCollapsed = true;
  }

  ngOnInit(){
    const code = localStorage.getItem('country') || 'FR';
    const selectedCountry = countryList.find(country => country.code === code);
    this.selected = selectedCountry;
  }

  select(country) {
    this.selected = country;
    localStorage.setItem('country', country.code);
    location.reload();
  }

  searchCountry() {
    const searchContent = this.searchContent.toLowerCase();

    this.filteredCountries = this.countryList.filter((countryItem) => {
      return countryItem.name.toLowerCase().indexOf(searchContent) > -1;
    });
  }
}
