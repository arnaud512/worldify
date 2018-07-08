import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ) { }

  newReleased;

  ngOnInit() {
    if (!this.spotifyService.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    let country = localStorage.getItem("country") || "FR";
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

  loadMore() {
    let country = localStorage.getItem("country") || "FR";
    this.spotifyService.getNewReleased(country, this.newReleased.albums.offset).subscribe(
      res => {
        console.log(res.albums.items.unshift(...this.newReleased.albums.items));
        this.newReleased = res
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
