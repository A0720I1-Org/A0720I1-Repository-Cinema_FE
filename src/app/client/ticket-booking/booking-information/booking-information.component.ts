import { Component, OnInit } from '@angular/core';
import {Invoice} from "../../../model/book-ticket/Invoice";
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceService} from "../../../service/invoice.service";
import {ToastrService} from "ngx-toastr";
import {Showtime} from "../../../model/book-ticket/Showtime";
import {Ticket} from "../../../model/book-ticket/Ticket";
import {ShowtimeService} from "../../../service/showtime.service";
import {TicketService} from "../../../service/ticket.service";

@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.scss']
})
export class BookingInformationComponent implements OnInit {
  invoice: Invoice = new Invoice();
  showtime: Showtime = new Showtime();
  ticketList: Ticket[] = [];
  invoiceId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private showtimeService: ShowtimeService,
    private ticketService: TicketService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.invoiceId = this.activatedRoute.snapshot.params['id'];
    this.invoiceService.getInvoiceById(this.invoiceId).subscribe(
      data => {
        this.invoice = data
      },
      error => this.toastrService.warning("Có lỗi xảy ra!", "Thông báo")
    )
    this.showtimeService.getShowtimeByInvoiceId(this.invoiceId).subscribe(
      data => this.showtime = data,
      error => this.toastrService.warning("Có lỗi xảy ra!", "Thông báo")
    )
    this.ticketService.getTicketListByInvoiceId(this.invoiceId).subscribe(
      data => this.ticketList = data,
      error => this.toastrService.warning("Có lỗi xảy ra!", "Thông báo")
    )
  }

  getTotalAmount(){
    let totalAmount = 0;
    if (this.ticketList != null){
      for (let ticket of this.ticketList){
        totalAmount+= ticket.price;
      }
    }
    return totalAmount;
  }

}
