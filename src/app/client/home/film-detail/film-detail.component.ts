import { ToastrService } from 'ngx-toastr';
import { ShowtimeService } from './../../../service/showtime.service';
import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FilmService} from "../../../service/film.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IFilmDetailDTO} from "../../../dto/IFilmDetailDTO";
import {HttpErrorResponse} from "@angular/common/http";
import { Showtime } from 'src/app/model/book-ticket/Showtime';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  idFilm: number;
  filmDetail: IFilmDetailDTO ;
  showtimeList: Showtime[] = [];
  constructor(
    private filmService: FilmService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private showtimeService :ShowtimeService,
    private toastrService:ToastrService
  ) {
  }

  ngOnInit(): void {
    this.idFilm = this.activatedRoute.snapshot.params['id'];
    this.getFilmById();
    this.getShowtimeList();
  }
  getShowtimeList() {
    this.showtimeService.getShowtimeList().subscribe(
      (data) => {
        this.showtimeList = data;
        console.log(data)
      },
      error => {
        console.log(error.message);
        this.toastrService.error("Có lỗi xảy ra", "Thông báo");
      }
    )
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
