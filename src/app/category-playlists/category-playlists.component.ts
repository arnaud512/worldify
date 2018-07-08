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

  playlists;
  name;

  ngOnInit() {
    if (!this.spotifyService.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    this.route
      .queryParams
      .subscribe(params => {
          this.name = params["name"];
      });

    let country = localStorage.getItem("country") || "FR";
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

  open(item) {
    window.location.href=item.uri;
  }

}
