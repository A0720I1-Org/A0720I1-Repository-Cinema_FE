import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DataService} from "../../../service/data.service";
import {Showtime} from "../../../model/book-ticket/Showtime";
import {Router} from "@angular/router";
import {Seat} from "../../../model/book-ticket/Seat";
import {PaymentMethod} from "../../../model/book-ticket/PaymentMethod";
import {ShowtimeService} from "../../../service/showtime.service";
import {ToastrService} from "ngx-toastr";
import {BookingInformation} from "../../../model/book-ticket/BookingInformation";
import {InvoiceService} from "../../../service/invoice.service";
import {Payment} from "../../../model/book-ticket/Payment";
import {PaymentService} from "../../../service/payment.service";
import {BookingStorageService} from "../../../service/booking-storage.service";
import {TokenStorageService} from "../../../service/token-storage.service";
import {Membership} from "../../../model/book-ticket/Membership";
import { MatDialog } from '@angular/material/dialog';

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
  payment = new Payment();
  membership: Membership = null;
  @ViewChild('loading', { static: true }) loading: TemplateRef<any>;
  constructor(
    private dataService: DataService,
    private router: Router,
    private showtimeService: ShowtimeService,
    private toastrService: ToastrService,
    private invoiceService: InvoiceService,
    private paymentService: PaymentService,
    private bookingStorageService: BookingStorageService,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.showtime = this.bookingStorageService.getShowtime();
    this.selectedSeats = this.bookingStorageService.getSeats();
    if (this.showtime == null || this.selectedSeats == null){
      this.router.navigateByUrl('/book/film-selection')
          this.toastrService.warning("Vui lòng chọn phim và suất chiếu", "Thông báo")
    }
    this.getSeatIdList();
    this.showtimeService.getPaymentMethodList().subscribe(
      data => this.paymentMethods = data,
      error => console.log(error.message))
      this.membership = this.tokenStorageService.getUser().membership;
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
    const memberId = this.tokenStorageService.getUser().membership.id;
    let bookingInformation = new BookingInformation(this.showtime.showtimeId, memberId, this.selectedSeatIdList, this.methodId);
    this.dataService.setBooking(bookingInformation);
    switch (this.methodId) {
      case 1: {
        this.payment.amount = this.getTotalAmount();
        this.bookingStorageService.saveBookingLocal(bookingInformation);
        this.invoiceService.checkSeatAvailable(bookingInformation).subscribe(
          data => {
            this.paymentService.payByPaypal(this.payment).subscribe(
              data => {
                window.location.href = data.link
              }
            )
          },
          error => {
            this.router.navigateByUrl('book/seat-selection')
            this.toastrService.warning(error.error.message, 'Có lỗi xảy ra');
          }
        )
        break;
      }
      case 2: {
        this.dialog.open(this.loading,{
          width: '150px',
          height:'125px',
        });
        this.invoiceService.checkSeatAvailable(bookingInformation).subscribe(
          data => {
            this.invoiceService.createInvoice(bookingInformation).subscribe(
              data => {
                this.dialog.closeAll();
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                  this.router.navigateByUrl('book/booking-information/' + data.id)
              });
                this.toastrService.success("Mua vé thành công", "Thông báo")
              },
              error => {
                this.toastrService.error("Có lỗi xảy ra");
                this.dialog.closeAll();
              }
            )
          },
          error => {
            console.log(error)
            this.router.navigateByUrl('book/seat-selection')
            this.toastrService.warning(error.error.message, 'Có lỗi xảy ra');
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

  goLogin() {
    this.toastrService.warning("Vui lòng đăng nhập để tiếp tục đặt vé", "Thông báo")
    console.log(this.router.url);
    this.router.navigate(['/member/login'], { state: { redirect: this.router.url } })
  }
}
