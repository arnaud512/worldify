import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-category-playlists',
  templateUrl: './category-playlists.component.html',
  styleUrls: ['./category-playlists.component.css']
})
export class CategoryPlaylistsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ) { }

  name;
  playlists;
  favorites: Array<String> = [];
  favoritesItems: Array<any> = [];

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

    const favs = localStorage.getItem(`fav-${id}`);
    if (favs) {
      this.favorites = [...JSON.parse(favs)];
      this.favorites.forEach(async (id) => this.favoritesItems.push(await this.spotifyService.getPlaylist(id).toPromise()));
    }

    const country = localStorage.getItem('country') || 'FR';
    this.spotifyService.getPlaylistsById(id, country).subscribe(
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

  isFavorite(id): boolean {
    return this.favorites.some((fav) => fav == id);
  }
  
  favorite(id): void {
    if (this.isFavorite(id)) {
      this.favorites = this.favorites.filter((fav) => fav !== id);
      this.favoritesItems = this.favoritesItems.filter((fav) => fav.id !== id);
    } else {
      this.favorites.push(id);
      this.spotifyService.getPlaylist(id).toPromise().then((playlist) => this.favoritesItems.push(playlist));
    }

    const playlist = this.route.snapshot.paramMap.get('id');
    localStorage.setItem(`fav-${playlist}`, JSON.stringify(this.favorites));
  }

}
