import {Component, OnInit} from '@angular/core';
import {ShowtimeService} from "../../../service/showtime.service";
import {Showtime} from "../../../model/book-ticket/Showtime";
import {BookTicketFilm} from "../../../model/book-ticket/BookTicketFilm";
import {TechnologyAndSubtitle} from "../../../model/book-ticket/TechnologyAndSubtitle";
import {DataService} from "../../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-film-selection',
  templateUrl: './film-selection.component.html',
  styleUrls: ['./film-selection.component.scss']
})
export class FilmSelectionComponent implements OnInit {
  showtimeList: Showtime[] = [];
  showtimeOfFilm: Showtime[] = [];
  showtimeOnDateList: Showtime[] = []
  filmList: BookTicketFilm[] = [];
  showDateList: Date[] = [];
  filmId: number = 0;
  showTimeDate: Date
  showtimeId: number = 0;
  selectedShowtime: Showtime = null;
  technologyAndSubtitle: TechnologyAndSubtitle[] = [];

  constructor(
    private showtimeService: ShowtimeService,
    private dataService: DataService,
    private router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getShowtimeList();
  }

  getShowtimeList() {
    this.showtimeService.getShowtimeList().subscribe(
      (data) => {
        this.showtimeList = data;
        this.filmList = Array.from(data.reduce((m, t) => m.set(t.filmId, t), new Map()).values());
        this.activatedRoute.queryParams
          .subscribe(params => {
              this.filmId = params.filmId;
              if (this.filmId != 0) {
                this.getShowtimeDateList(this.filmId)
              }
            }
          );
      },
      error => {
        console.log(error.message)
      }
    )
  }

  getShowtimeDateList(filmId: number) {
    this.showTimeDate = null
    this.technologyAndSubtitle = [];
    this.selectedShowtime = null;
    this.showtimeId = 0;
    this.filmId = filmId;
    this.showtimeOfFilm = this.showtimeList.filter((showtime) => showtime.filmId == filmId)
    this.showDateList = Array.from(this.showtimeOfFilm.reduce((m, t) => m.set(t.showtimeDay, t.showtimeDay), new Map()).values());
  }

  getDayOfDate(showDate: Date): string {
    const date = new Date(showDate)
    const dayList = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const index = date.getDay();
    return dayList[index];
  }

  getShowtimeOnDate(showDate: Date) {
    this.showTimeDate = showDate;
    this.selectedShowtime = null
    this.showtimeId = 0;
    this.showtimeOnDateList = this.showtimeList.filter((showtime) => showtime.showtimeDay == showDate && showtime.filmId == this.filmId);
    this.technologyAndSubtitle = Array.from(this.showtimeOnDateList.reduce((m, t) => m.set(t.filmTechnology + '-' + t.subtitle, new TechnologyAndSubtitle(t.filmTechnology, t.subtitle)), new Map()).values());
  }

  getShowtimeOnDateByType(type: TechnologyAndSubtitle) {
    return this.showtimeOnDateList.filter((showtime) => showtime.filmTechnology == type.filmTechnology && showtime.subtitle == type.subtitle)
  }

  selectShowtime(showtime: Showtime) {
    this.showtimeId = showtime.showtimeId
    this.selectedShowtime = showtime;
  }

  next() {
    if (this.selectedShowtime != null) {
      this.dataService.setShowtime(this.selectedShowtime)
      this.router.navigateByUrl("/book/seat-selection")
    } else {
      this.toastrService.error("Vui lòng chọn suất chiếu", "Lỗi")
    }
  }
}
