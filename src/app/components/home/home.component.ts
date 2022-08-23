import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/interfaces/film';
import { APIResponse } from 'src/app/interfaces/http';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public films: Array<Film> = [];
  filmSub: Subscription = new Subscription();
  routeSub: Subscription = new Subscription();

  constructor(
    private router: Router,
    private filmService: FilmService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.searchFilms(params['title']);
    });
  }

  openFilm(id: number): void {
    this.router.navigate(['about', id]);
  }

  searchFilms(search?: string): void {
    this.filmSub = this.filmService
      .getFilmList(search)
      .subscribe((response: APIResponse<Film>) => {
        this.films = response.data;
      });
  }
}