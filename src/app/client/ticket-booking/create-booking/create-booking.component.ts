import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DataService} from "../../../service/data.service";
import {Router} from "@angular/router";
import {BookingInformation} from "../../../model/book-ticket/BookingInformation";
import {InvoiceService} from "../../../service/invoice.service";
import {ToastrService} from "ngx-toastr";
import {BookingStorageService} from "../../../service/booking-storage.service";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {
  booking: BookingInformation
  @ViewChild('loading', { static: true }) loading: TemplateRef<any>;
  constructor(
    private dataService: DataService,
    private router: Router,
    private invoiceService: InvoiceService,
    private toastrService: ToastrService,
    private bookingStorageService: BookingStorageService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.dialog.open(this.loading,{
      width: '150px',
      height:'125px',
    });
    this.booking = this.bookingStorageService.getBooking()
    if (this.booking != null) {
      this.invoiceService.createInvoice(this.booking).subscribe(
        data => {
          this.dialog.closeAll()
          this.bookingStorageService.clear();
          this.router.navigateByUrl('book/booking-information/' + data.id);
          this.toastrService.success("Đặt vé thành công", "Thông báo")
        },
        error => {
          this.dialog.closeAll()
          this.toastrService.error("Có lỗi xảy ra", "Thông báo");
        }
      )
    } else {
      this.router.navigateByUrl('/book/film-selection')
      this.toastrService.warning("Vui lòng chọn phim và suất chiếu", "Thông báo")
    }
  }

}
