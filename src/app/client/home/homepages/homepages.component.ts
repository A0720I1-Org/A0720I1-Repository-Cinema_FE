import {Component, OnInit} from '@angular/core';
import {IFilmDTO} from "../../../dto/IFilmDTO";
import {FilmService} from "../../../service/film.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ViewTrailerComponent} from "../view-trailer/view-trailer.component";
import {IFilmTopDTO} from "../../../dto/IFilmTopDTO";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../service/token-storage.service";

@Component({
  selector: 'app-homepages',
  templateUrl: './homepages.component.html',
  styleUrls: ['./homepages.component.scss']
})
export class HomepagesComponent implements OnInit {
  listTopFilm: IFilmTopDTO[] = [];
  listFilmData: IFilmDTO[] = [];
  isShowing: boolean;
  nameSearch: string = '';
  username: string;
  role: string;
  isLoggedIn: boolean = false;

  constructor(
    private filmService: FilmService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) {
  }

  ngOnInit(): void {
    this.load();
    this.getListUpShowingFilm();
    this.getTopFilm();
  }

  load() {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().account.username;
      console.log(this.role);
      this.role = this.tokenStorageService.getUser().roles[0];
    }
    this.isLoggedIn = this.username != null;
  }

  getTopFilm() {
    this.filmService.getTopFilm().subscribe(
      (data) => {
        this.listTopFilm = data;
      }, (error: HttpErrorResponse) => {
        console.log(error.message)
      })
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
      if (this.nameSearch == '') {
        this.filmService.getListUpShowingFilmDTO().subscribe((data) => {
          this.listFilmData = data;
          this.router.navigateByUrl('/').then(
            r => this.toastrService.warning(
              "Vui lòng nhập để tìm kiếm",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        })
      }
      this.filmService.searchUpShowingFilmDTO(this.nameSearch).subscribe((data) => {
        if (data == '' || data == null) {
          this.router.navigateByUrl('/').then(
            r => this.toastrService.error(
              "Không tìm thấy dữ liệu",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        } else {
          this.listFilmData = data;
        }
      })
    } else {
      if (this.nameSearch == '') {
        this.filmService.getListUpComingFilmDTO().subscribe((data) => {
          this.listFilmData = data;
          this.router.navigateByUrl('/').then(
            r => this.toastrService.warning(
              "Vui lòng nhập để tìm kiếm",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        })
      }
      this.filmService.searchUpComingFilmDTO(this.nameSearch).subscribe((data) => {
        if (data == '') {
          this.router.navigateByUrl('/').then(
            r => this.toastrService.error(
              "Không tìm thấy dữ liệu",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        } else {
          this.listFilmData = data;
        }
      })
    }
  }

  viewTrailer(trailer: string) {
    this.dialog.open(ViewTrailerComponent, {
      width: 'auto',
      data: {trailer: trailer + '?autoplay=1'}
    });
  }
}
