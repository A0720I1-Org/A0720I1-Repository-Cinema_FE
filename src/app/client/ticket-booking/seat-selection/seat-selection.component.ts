import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../service/data.service";
import {Showtime} from "../../../model/book-ticket/Showtime";
import {ActivatedRoute, Router} from "@angular/router";
import {Seat} from "../../../model/book-ticket/Seat";
import {CinemaRoomLayout} from "../../../model/book-ticket/CinemaRoomLayout";
import {ShowtimeService} from "../../../service/showtime.service";
import {ToastrService} from "ngx-toastr";
import {KeepingSeatService} from "../../../service/keeping-seat.service";
import {AngularFireList} from "@angular/fire/database";
import {not} from "rxjs/internal-compatibility";
import {map} from "rxjs/operators";
import {BookingStorageService} from "../../../service/booking-storage.service";

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  showtime: Showtime = new Showtime();
  seatList: Array<Seat> = [];
  selectedSeats: Seat[] = [];
  keepingSeats: Seat[]
  layout: CinemaRoomLayout = new CinemaRoomLayout();
  rows = [];
  columns = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private showtimeService: ShowtimeService,
    private toastrService: ToastrService,
    private keepingSeatService: KeepingSeatService,
    private bookingStorageService: BookingStorageService
  ) {
  }

  ngOnInit(): void {
    this.getShowtime();
    this.getKeepingSeatList()
  }

  getShowtime() {
    this.dataService.showtime.subscribe(
      data => {
        if (data == null) {
          this.router.navigateByUrl('/book/film-selection')
          this.toastrService.warning("Vui lòng chọn phim và suất chiếu", "Thông báo")
        } else {
          this.showtime = data;
          this.showtimeService.getSeatList(this.showtime.showtimeId).subscribe(
            (list) => {
              this.seatList = list
            });
          this.showtimeService.getCinemaRoomLayout(this.showtime.showtimeId).subscribe(
            layout => {
              this.layout = layout;
              this.rows = Array.from(Array(this.layout.rowSeat).keys());
              this.columns = Array.from(Array(this.layout.columnSeat).keys())
            });
        }
      },
      error => console.log(error.message)
    );
  }

  getKeepingSeatList() {
    // this.keepingSeatService.getKeepingSeatList().snapshotChanges().pipe(
    //   map(
    //     changes => changes.map(
    //       c =>({key: c.payload.key, ...c.payload.val})
    //     ))
    // ).subscribe(seats => {
    //   this.keepingSeats = seats;
    //   console.log(seats[].)
    // })
  }

  // getKeepingSeatById(id: number) {
  //   this.keepingSeatService.getSeatById(id).snapshotChanges().subscribe(
  //     res => {
  //       if (res.payload.exists){
  //
  //       }
  //     }
  //   )
  // }

  back() {
    this.router.navigateByUrl("/book/film-selection")
  }

  next() {
    if (this.selectedSeats.length > 0) {
      this.bookingStorageService.saveShowtimeLocal(this.showtime);
      this.bookingStorageService.saveSeatsLocal(this.selectedSeats);
      this.router.navigateByUrl("/book/booking-confirmation")
    } else {
      this.toastrService.error("Vui lòng chọn ghế ", "Lỗi");
    }
  }

  selectSeat(seat: Seat) {
    if (seat.seatCode != 'n' && seat.seatCode != 'd' && seat.ticketId == null) {
      if (this.selectedSeats != []) {
        if (this.selectedSeats.indexOf(seat) == -1) {
          if (this.selectedSeats.length < 8) {
            this.selectedSeats.push(seat)
          } else {
            this.toastrService.warning("Chỉ được chọn tối đa 8 ghế ", "Thông báo")
          }
        } else {
          this.selectedSeats.splice(this.selectedSeats.indexOf(seat), 1);
        }
      } else {
        this.selectedSeats.push(seat)
      }
    }
  }

  selected(seat: Seat) {
    if (this.selectedSeats != null) {
      return this.selectedSeats.indexOf(seat) != -1;
    }
    return false
  }

  getTotal() {
    let total = 0;
    for (let seat of this.selectedSeats) {
      total += seat.price
    }
    return total
  }
}
