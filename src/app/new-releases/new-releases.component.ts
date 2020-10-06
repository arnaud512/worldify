import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService
  ) { }

  newReleased;

  ngOnInit(): void {
    if (!this.spotifyService.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    const country = localStorage.getItem('country') || 'FR';
    this.spotifyService.getNewReleased(country, -50).subscribe(
      res => {
        this.newReleased = res;
      }, err => {
        if (err.status === 401) {
          this.spotifyService.retrieveToken(window.location.origin);
        }
      }
    );
  }

  loadMore(): void {
    const country = localStorage.getItem('country') || 'FR';
    this.spotifyService.getNewReleased(country, this.newReleased.albums.offset).subscribe(
      res => {
        res.albums.items.unshift(...this.newReleased.albums.items);
        this.newReleased = res;
      }, err => {
        if (err.status === 401) {
          this.spotifyService.retrieveToken(window.location.origin);
        }
      }
    );
  }

  open(item: { uri: string; }): void {
    window.location.href = item.uri;
  }


}
