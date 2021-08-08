import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../service/data.service";
import {Router} from "@angular/router";
import {BookingInformation} from "../../../model/book-ticket/BookingInformation";
import {InvoiceService} from "../../../service/invoice.service";
import {ToastrService} from "ngx-toastr";
import {BookingStorageService} from "../../../service/booking-storage.service";

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {
  booking: BookingInformation

  constructor(
    private dataService: DataService,
    private router: Router,
    private invoiceService: InvoiceService,
    private toastrService: ToastrService,
    private bookingStorageService: BookingStorageService
  ) {
  }

  ngOnInit(): void {
    this.booking = this.bookingStorageService.getBooking()
    if (this.booking != null) {
      this.invoiceService.createInvoice(this.booking).subscribe(
        data => {
          this.bookingStorageService.clear();
          this.router.navigateByUrl('book/booking-information/' + data.id)
        },
        error => {
          this.toastrService.error("Có lỗi xảy ra", "Thông báo");
        }
      )
    } else {
      this.router.navigateByUrl('/book/film-selection')
      this.toastrService.warning("Vui lòng chọn phim và suất chiếu", "Thông báo")
    }
  }

}
