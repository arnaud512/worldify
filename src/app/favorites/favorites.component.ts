import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService
  ) { }

  favLists: object = {};
  favListsItems: object = {};

  ngOnInit(): void {
    if (!this.spotifyService.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    const featuredFavs = localStorage.getItem('fav-featured');
    if (featuredFavs) {
      this.favListsItems['featured'] = []
      this.favLists['featured'] = { name: 'Featured', order: 0, favorites: JSON.parse(featuredFavs) };
      this.favLists['featured'].favorites.forEach(async (id) => this.favListsItems['featured'].push(await this.spotifyService.getPlaylist(id).toPromise()));
    }
    
    const favCategories = localStorage.getItem('fav-categories');
    if (favCategories) {
      const categories = JSON.parse(favCategories).sort();
      categories.forEach(async (category, index) => {
        const categoryData = await this.spotifyService.getCategory(category).toPromise();
        const categoryFavs = localStorage.getItem(`fav-${category}`);
        if (categoryFavs) {
          this.favListsItems[category] = []
          this.favLists[category] = { name: categoryData.name, order: index + 1, favorites: JSON.parse(categoryFavs) };
          this.favLists[category].favorites.forEach(async (id) => this.favListsItems[category].push(await this.spotifyService.getPlaylist(id).toPromise()));
        }
      });
    }
  }

  open(item: { uri: string; }): void {
    window.location.href = item.uri;
  }

  isFavorite(list, id): boolean {
    return this.favLists[list].favorites.some((fav) => fav == id);
  }
  
  async favorite(list, id): Promise<void> {
    if (this.isFavorite(list, id)) {
      this.favLists[list].favorites = this.favLists[list].favorites.filter((fav) => fav !== id);
      this.favListsItems[list] = this.favListsItems[list].filter((fav) => fav.id !== id);
    } else {
      this.favLists[list].favorites.push(id);
      this.favListsItems[list].push(await this.spotifyService.getPlaylist(id).toPromise());
    }

    localStorage.setItem(`fav-${list}`, JSON.stringify(this.favLists[list].favorites));

    if (this.favLists[list].favorites.length == 0)
      localStorage.removeItem(`fav-${list}`);

    const favCategories = localStorage.getItem('fav-categories');
    if (favCategories)
    {
      const categories = JSON.parse(favCategories);
      if (categories.includes(list) && this.favLists[list].favorites.length === 0) {
        const newCategories = categories.filter((category) => category !== list);
        localStorage.setItem('fav-categories', JSON.stringify(newCategories));

        if (newCategories.length == 0)
          localStorage.removeItem('fav-categories');
      }
    }

    if (this.favLists[list].favorites.length == 0) {
      delete this.favLists[list];
      delete this.favListsItems[list];
    }
  }
  
}
