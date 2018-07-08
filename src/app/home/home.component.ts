import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ) { }

  featuredPlaylists;

  ngOnInit() {
    if (!this.spotifyService.isAuthenticated()) {
      console.log("not authenticated");
      this.router.navigate(['login']);
      return;
    }

    this.spotifyService.getFeaturedPlaylists().subscribe(
      res => {
        console.log(res);
        this.featuredPlaylists = res;
      }, err => {
        if (err.status === 401) {
          this.spotifyService.retrieveToken(window.location.origin);
        }
      }
    );
  }

  open(item) {
    window.location.href=item.uri;
  }

}
