import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { BrowserStorageService } from '../services/browser-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService,
    private browserStorageService: BrowserStorageService
  ) { }

  featuredPlaylists;
  favorites: Array<String> = [];
  favoritesItems: Array<any> = [];

  ngOnInit(): void {
    if (!this.spotifyService.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    const favs = localStorage.getItem('fav-featured');
    if (favs) {
      this.favorites = [...JSON.parse(favs)];
      this.favorites.forEach(async (id) => this.favoritesItems.push(await this.spotifyService.getPlaylist(id).toPromise()));
    }

    const countryCode = this.browserStorageService.getCountryCode();
    this.spotifyService.getFeaturedPlaylists(countryCode).subscribe(
      res => {
        this.featuredPlaylists = res;
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

  isFavorite(id): boolean {
    return this.favorites.some((fav) => fav == id);
  }
  
  async favorite(id): Promise<void> {
    if (this.isFavorite(id)) {
      this.favorites = this.favorites.filter((fav) => fav !== id);
      this.favoritesItems = this.favoritesItems.filter((fav) => fav.id !== id);
    } else {
      this.favorites.push(id);
      this.favoritesItems.push(await this.spotifyService.getPlaylist(id).toPromise());
    }

    localStorage.setItem('fav-featured', JSON.stringify(this.favorites));

    if (this.favorites.length == 0)
        localStorage.removeItem('fav-featured');
    }
  
}
