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
  selected = { code: "FR", name: "France"};
  isCollapsed = true;
  countryList = countryList;
 
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
    let code = localStorage.getItem("country") || "FR";
    let country = countryList.find(country => country.code == code);
    this.selected = country;
  }

  select(country) {
    this.selected = country;
    localStorage.setItem("country", country.code);
    location.reload();
  }
}
