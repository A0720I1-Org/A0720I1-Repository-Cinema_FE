import {Component, OnInit} from '@angular/core';
import {ListFilmDTO} from "../dto/ListFilmDTO";
import {HttpErrorResponse} from "@angular/common/http";
import {FilmService} from "../../../service/film.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FilmViewDTO} from "../dto/FilmViewDTO";

@Component({
  selector: 'app-list-film',
  templateUrl: './list-film.component.html',
  styleUrls: ['./list-film.component.scss']
})
export class ListFilmComponent implements OnInit {

  listFilm: ListFilmDTO[];
  name: string = '';
  // startDate: string = '';
  page = 0;
  pageSize = 8;
  totalPage: number;
  // deleteFilm: ListFilmDTO;
  film: FilmViewDTO;

  constructor(
    private filmService: FilmService,
    private router: Router,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getSearchByName();
  }


  getSearchByName() {
    if (this.name == '') {
      this.filmService.getListFilm(this.page).subscribe((data: any) => {
          if (data == null) {
            this.router.navigateByUrl('/admin/film/list').then(
              r => this.toastrService.warning(
                "Không tìm thấy dữ liệu",
                "Thông báo",
                {timeOut: 3000, extendedTimeOut: 1500})
            )
          } else {
            // this.listFilm = data;
            this.listFilm = data.content;
            this.totalPage = data.totalPages;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
    } else {
      this.filmService.searchByName(this.name, this.page).subscribe((data: any) => {
          if (data == null) {
            this.router.navigateByUrl('/admin/film/list').then(
              r => this.toastrService.warning(
                "Không tìm thấy dữ liệu",
                "Thông báo",
                {timeOut: 3000, extendedTimeOut: 1500})
            )
          } else {
            // this.listFilm = data;
            this.listFilm = data.content;
            this.totalPage = data.totalPages;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
    }
  }

  paginate(page: number) {
    if (page >= 0 && page < this.totalPage) {
      this.page = page;
      this.ngOnInit()
    }
  }

  // deleteFilmById(id:number){
  //   this.filmService.deleteFilm(id).subscribe(
  //     (response: void) => {
  //       this.ngOnInit();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }
  //
  // public onOpenModal(film: ListFilmDTO, mode: string): void {
  //   const container = document.getElementById('main-container');
  //   const button = document.createElement('button');
  //   button.type = 'button';
  //   button.style.display = 'none';
  //   button.setAttribute('data-toggle', 'modal');
  //   if (mode === 'delete') {
  //     this.deleteFilm = film;
  //     button.setAttribute('data-target', '#deleteFilmModal');
  //   }
  //   container.appendChild(button);
  //   button.click();
  // }

}
