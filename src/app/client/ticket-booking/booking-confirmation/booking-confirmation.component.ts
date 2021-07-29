import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../service/data.service";
import {Showtime} from "../../../model/book-ticket/Showtime";
import {Router} from "@angular/router";
import {Seat} from "../../../model/book-ticket/Seat";
import {PaymentMethod} from "../../../model/book-ticket/PaymentMethod";
import {ShowtimeService} from "../../../service/showtime.service";
import {ToastrService} from "ngx-toastr";
import {BookingInformation} from "../../../model/book-ticket/BookingInformation";
import {InvoiceService} from "../../../service/invoice.service";

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {
  showtime: Showtime;
  selectedSeats: Seat[];
  selectedSeatIdList = [];
  paymentMethods: PaymentMethod[];
  methodId = 0;

  constructor(
    private dataService: DataService,
    private router: Router,
    private showtimeService: ShowtimeService,
    private toastrService: ToastrService,
    private invoiceService: InvoiceService
  ) {
  }

  ngOnInit(): void {
    this.dataService.showtime.subscribe(data => this.showtime = data)
    this.dataService.selectSeat.subscribe(
      data => {
        this.selectedSeats = data;
        for (let seat of data) {
          this.selectedSeatIdList.push(seat.id);
        }
      });
    this.showtimeService.getPaymentMethodList().subscribe(data => this.paymentMethods = data)
  }

  getTotalAmount() {
    let totalAmount = 0;
    for (let seat of this.selectedSeats) {
      totalAmount += seat.price
    }
    return totalAmount;
  }

  getSeatIdList() {
    for (let seat of this.selectedSeats) {
      this.selectedSeatIdList.push(seat.id)
    }
    console.log(this.selectedSeatIdList)
  }

  selectMethod(methodId: number) {
    this.methodId = methodId
  }

  back() {
    this.router.navigateByUrl("/book/seat-selection")
  }

  next() {
    let bookingInformation = new BookingInformation(this.showtime.showtimeId, 1, this.selectedSeatIdList, this.methodId)
    switch (this.methodId) {
      case 1: {
        console.log(this.methodId);
        break;
      }
      case 2: {
        console.log((this.methodId));
        break
      }
      case 3: {
        this.invoiceService.createInvoice(bookingInformation).subscribe(
          data => {
            console.log(data.id)
            this.router.navigateByUrl('book/booking-information/' + data.id)
          }
        )
        console.log(bookingInformation);
        break;
      }
      default: {
        this.toastrService.warning("Vui lòng chọn hình thức thanh toán", "Thông báo")
      }

    }
  }
}
