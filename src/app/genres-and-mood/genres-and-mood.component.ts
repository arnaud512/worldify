import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { BrowserStorageService } from '../services/browser-storage.service';

@Component({
  selector: 'app-genres-and-mood',
  templateUrl: './genres-and-mood.component.html',
  styleUrls: ['./genres-and-mood.component.css']
})
export class GenresAndMoodComponent implements OnInit {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService,
    private browserStorageService: BrowserStorageService
  ) { }

  genres;

  ngOnInit(): void {
    if (!this.spotifyService.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    const country = this.browserStorageService.getLocal('country') || 'FR';
    this.spotifyService.getGenres(country).subscribe(
      res => {
        this.genres = res;
      }, err => {
        if (err.status === 401) {
          this.spotifyService.retrieveToken(window.location.origin);
        }
      }
    );
  }

  open(item: { id: string; name: string; }): void {
    this.router.navigate(['/playlists/' + item.id], {queryParams: {name: item.name}});
  }

}
