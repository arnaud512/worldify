import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { BrowserStorageService } from '../services/browser-storage.service';

@Component({
  selector: 'app-category-playlists',
  templateUrl: './category-playlists.component.html',
  styleUrls: ['./category-playlists.component.css']
})
export class CategoryPlaylistsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService,
    private browserStorageService: BrowserStorageService
  ) { }

  playlists;
  name;

  ngOnInit(): void {
    if (!this.spotifyService.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    this.route
      .queryParams
      .subscribe(params => {
          this.name = params.name;
      });
    const countryCode = this.browserStorageService.getCountryCode('country');
    this.spotifyService.getPlaylistsById(id, countryCode).subscribe(
      res => {
        this.playlists = res.playlists;
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
