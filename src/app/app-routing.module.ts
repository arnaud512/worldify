import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { GenresAndMoodComponent } from './genres-and-mood/genres-and-mood.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CategoryPlaylistsComponent } from './category-playlists/category-playlists.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-releases', component: NewReleasesComponent },
  { path: 'genres', component: GenresAndMoodComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'playlists/:id', component: CategoryPlaylistsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
