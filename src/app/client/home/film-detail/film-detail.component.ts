import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FilmService} from "../../../service/film.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IFilmDetailDTO} from "../../../dto/IFilmDetailDTO";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  idFilm: number;
  filmDetail: IFilmDetailDTO ;

  constructor(
    private filmService: FilmService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.idFilm = this.activatedRoute.snapshot.params['id'];
    this.getFilmById()
  }

  getFilmById() {
    this.filmService.getFilmById(this.idFilm).subscribe(
      (data) => {
        this.filmDetail = data;
      }, (error: HttpErrorResponse) => {
        console.log(error.message)
      })
  }
}
