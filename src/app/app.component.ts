import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spotify Featured - France';

  isAuthenticated() {
    this.spotifyService.isAuthenticated()
  }

  constructor(private spotifyService: SpotifyService){
    
  }

  ngOnInit(){

  }
}
