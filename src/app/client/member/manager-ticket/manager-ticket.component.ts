import { TicketService } from './../../../service/ticket.service';
import { ITicketDTO } from './../../phat-model/dto/ITicketDTO';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-manager-ticket',
  templateUrl: './manager-ticket.component.html',
  styleUrls: ['../member.component.scss','./manager-ticket.component.scss']
})
export class ManagerTicketComponent implements OnInit {
  tickets : ITicketDTO[]=[];
  page = 0;
  totalPage: number;
  constructor(private ticketService:TicketService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
     private tokenStore: TokenStorageService) { }

  ngOnInit(): void {
    this.ticketService.getAllTicket(this.page).subscribe(data=>{
      this.tickets = data.content;
      this.totalPage=data.totalPages;
    })
  }
  lastPage() {
    this.page = this.totalPage - 1;
    this.ngOnInit();
  }
  firstPage() {
    this.page = 0;
    this.ngOnInit();
  }
  nextPage() {
    this.page += 1;
    this.ngOnInit();
  }
  previousPage() {
    this.page -= 1;
    this.ngOnInit();
  }
  changePage(page: number) {
    this.page = page;
    this.ngOnInit();
  }
  selectPage(selectPage: number) {
    if (selectPage <= this.totalPage) {
      this.page = selectPage - 1;
      this.ngOnInit();
    } else {
      console.log("123")
    }
  }
  paginate(page: number) {
    if (page >= 0 && page < this.totalPage) {
      this.page = page;
      this.ngOnInit()
    }
  }
}
