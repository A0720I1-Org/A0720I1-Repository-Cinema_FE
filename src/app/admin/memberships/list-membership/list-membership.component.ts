import {Component, OnInit} from '@angular/core';
import {MembershipDTO} from "../../cinema-room/dto/membershipDTO";
import {MembershipService} from "../../../service/membership.service";
import {DTOCinemaRoom} from "../../cinema-room/dto/DTOCinemaRoom";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-list-membership',
  templateUrl: './list-membership.component.html',
  styleUrls: ['./list-membership.component.scss']
})
export class ListMembershipComponent implements OnInit {
  listMembership: MembershipDTO[];
  page = 0;
  totalPage: number;

  constructor(private membershipService: MembershipService) {
  }

  ngOnInit(): void {
    this.getListMembership(this.page);
  }

  getListMembership(page) {
    this.membershipService.getListMembership(page).subscribe(
      (data: any) => {
        this.listMembership = data.content;
        this.totalPage=data.totalPages;
      }),
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
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
