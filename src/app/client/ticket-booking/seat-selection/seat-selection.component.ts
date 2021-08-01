import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../service/data.service";
import {Showtime} from "../../../model/book-ticket/Showtime";
import {ActivatedRoute, Router} from "@angular/router";
import {Seat} from "../../../model/book-ticket/Seat";
import {CinemaRoomLayout} from "../../../model/book-ticket/CinemaRoomLayout";
import {ShowtimeService} from "../../../service/showtime.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  showtime: Showtime = new Showtime();
  seatList : Array<Seat> = [];
  selectedSeats: Seat[] = [];
  layout: CinemaRoomLayout = new CinemaRoomLayout();
  rows = [];
  columns = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private showtimeService: ShowtimeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getShowtime();
  }

  getShowtime(){
    this.dataService.showtime.subscribe(
      data => {
        if (data == null){
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
              console.log(this.rows)
            });
        }
      },
      error => console.log(error.message)
    );
  }


  back() {
    this.router.navigateByUrl("/book/film-selection")
  }

  next() {
    if (this.selectedSeats.length > 0){
      this.dataService.setSelectSeat(this.selectedSeats);
      this.router.navigateByUrl("/book/booking-confirmation")
    } else {
      this.toastrService.error("Vui lòng chọn ghế ", "Lỗi")
    }

  }

  selectSeat(seat: Seat) {
    if (seat.seatCode != 'n' && seat.seatCode != 'd' && seat.ticketId == null){
      if (this.selectedSeats != []){
        if (this.selectedSeats.indexOf(seat) == -1) {
          if (this.selectedSeats.length < 8){
            this.selectedSeats.push(seat)
          } else {
            this.toastrService.warning("Chỉ được chọn tối đa 8 ghế ", "Thông báo")
          }
        } else {
          this.selectedSeats.splice(this.selectedSeats.indexOf(seat),1);
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
    for (let seat of this.selectedSeats){
      total += seat.price
    }
    return total
  }
}
