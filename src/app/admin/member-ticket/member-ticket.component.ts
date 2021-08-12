import { IInvoiceMemberDTO } from './../../dto/IInvoiceMemberDTO';
import { InvoiceService } from './../../service/invoice.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf'
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
  phone:string='';
  invoice:any='';
  isHidden:boolean;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  constructor(private invoiceService: InvoiceService) {
    this.isHidden =  true
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
  download(id:number) {
    this.invoiceService.getInvoiceMember(id).subscribe(
    (data) => {
        console.log(data);
        this.invoice = data;
    },
    err => {console.log(err)},
    async (): Promise<void> => {
      console.log(123)
      const doc = new jsPDF('p', 'pt', 'a4');
      doc.setFont('Roboto-Regular', 'normal');
      doc.text(35, 25, "Text with the letter Anh yêu em ");
      doc.setFontSize(8);
      const specialElementHandlers = {
        '#editor': function (element, renderer) {
          return true;
        }
      };

      const pdfTable = this.pdfTable.nativeElement;
      doc.fromHTML(pdfTable.innerHTML, 15, 15, {
        width: 190,
        'elementHandlers': specialElementHandlers
      });
    //   doc.html(pdfTable, {
    //     callback: (doc) => {
    //       doc.output("dataurlnewwindow");
    //     }
    //  });

    await doc.save('table.pdf', {returnPromise: true});
    }
    )

  }
}
