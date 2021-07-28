import {Component, OnInit} from '@angular/core';
import {IFilmDTO} from "../../dto/IFilmDTO";
import {FilmService} from "../../service/film.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-homepages',
  templateUrl: './homepages.component.html',
  styleUrls: ['./homepages.component.scss']
})
export class HomepagesComponent implements OnInit {
  listFilmData: IFilmDTO[] = [];
  isShowing: boolean;
  nameSearch: string;

  constructor(
    private filmService: FilmService
  ) {
  }

  ngOnInit(): void {
    this.getListUpShowingFilm();
  }

  getListUpShowingFilm() {
    this.filmService.getListUpShowingFilmDTO().subscribe(
      (data: IFilmDTO[]) => {
        this.isShowing = true;
        this.listFilmData = data;
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      })
  }

  getListUpComingFilm() {
    this.filmService.getListUpComingFilmDTO().subscribe(
      data => {
        this.isShowing = false;
        this.listFilmData = data;
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      })
  }

  searchFilm() {
    if (this.isShowing) {
      console.log(this.isShowing);
      this.filmService.searchUpShowingFilmDTO(this.nameSearch).subscribe((data) => {
        this.listFilmData = data
      })
    } else {
      this.filmService.searchUpComingFilmDTO(this.nameSearch).subscribe((data) => {
        this.listFilmData = data
      })
    }
  }
}
