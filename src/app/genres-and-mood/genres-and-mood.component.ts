import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';


@Component({
  selector: 'app-genres-and-mood',
  templateUrl: './genres-and-mood.component.html',
  styleUrls: ['./genres-and-mood.component.css']
})
export class GenresAndMoodComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ) { }

  genres;

  ngOnInit() {
    if (!this.spotifyService.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    let country = localStorage.getItem("country") || "FR";
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

  open(item) {
    this.router.navigate(['/playlists/'+ item.id], {queryParams: {name: item.name}});
  }

}
