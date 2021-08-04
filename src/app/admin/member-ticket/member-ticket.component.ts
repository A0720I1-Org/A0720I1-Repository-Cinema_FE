import { InvoiceService } from './../../service/invoice.service';
import { Component, OnInit } from '@angular/core';
import { ppid } from 'process';
@Component({
  selector: 'app-member-ticket',
  templateUrl: './member-ticket.component.html',
  styleUrls: ['./member-ticket.component.scss']
})
export class MemberTicketComponent implements OnInit {
  name: string = '';
  page = 0;
  totalPage: number;
  listTicket: any = [];
  editTicket:any;
  card:string='';
  constructor(private invoiceService: InvoiceService) {
  }
  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.invoiceService.getTicketAll(this.page).subscribe((data: any) => {
      if(data != null) {
        this.listTicket = data.content;
        this.totalPage = data.totalPages;
      }
    })
  }
  onClickGetList(phone) {
    if (phone ==''){
      this.invoiceService.getTicketAll(this.page).subscribe((data: any) => {
        if(data != null) {
          this.listTicket = data.content;
          this.totalPage = data.totalPages;
        }
      })
    }else {
      this.invoiceService.getTicketAllBySearch(this.page,phone).subscribe((data: any) => {
        if(data != null) {
          this.listTicket = data.content;
          this.totalPage = data.totalPages;
        }
        else {
          this.listTicket = [];
        }
      })
  }
  }

  paginate(page: number) {
    if (page >= 0 && page < this.totalPage) {
      this.page = page;
      this.ngOnInit()
    }
  }
  onOpenModal(ticket:any,mode:string) {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editTicket = ticket;
      button.setAttribute('data-target', '#ticket');
    }
    container.appendChild(button);
    button.click();
  }
  onPrintTicket(id:any) {
    console.log(id);
   this.invoiceService.updateTicketPrinted(id).subscribe((data) => {
     this.ngOnInit();
   })
  }
}
