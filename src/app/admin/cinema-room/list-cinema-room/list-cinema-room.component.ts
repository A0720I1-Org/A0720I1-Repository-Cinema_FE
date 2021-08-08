import {Component, OnInit} from '@angular/core';
import {CinemaRoomService} from "../../../service/cinema-room.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-cinema-room',
  templateUrl: './list-cinema-room.component.html',
  styleUrls: ['./list-cinema-room.component.scss']
})
export class ListCinemaRoomComponent implements OnInit {

  name: string = '';
  page = 0;
  totalPage: number;

  listCinemaRoom: any;

  constructor(private cinemaRoomService: CinemaRoomService,
              private router: Router,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.cinemaRoomService.getAllListCinemaRoom(this.page).subscribe((data: any) => {
      this.listCinemaRoom = data.content;
      this.totalPage = data.totalPages;
    })
  }

  getSearchByName() {
    if (this.name == '') {
      this.cinemaRoomService.getAllListCinemaRoom(this.page).subscribe((data: any) => {
        this.listCinemaRoom = data.content;
        this.totalPage = data.totalPages;
        this.toastrService.warning(
          "Vui lòng nhập dữ liệu cần tìm",
          "Thông báo",
          {timeOut: 3000, extendedTimeOut: 1500})
      })
    } else {
      this.cinemaRoomService.getSearchByName(this.name,this.page).subscribe((data: any) => {
        if (data == null || data == '') {
           this.toastrService.error(
              "Không tìm thấy dữ liệu",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
        } else {
          this.listCinemaRoom = data.content;
          this.totalPage = data.totalPages;
        }
      })
    }
  }



  getTotalSeat(seatLayout: string) {
    let totalSeat = 0;
    for (let i = 0; i <= seatLayout.length; i++) {
      if (seatLayout[i] == 's' || seatLayout[i] == 'v') {
        totalSeat++;
      }
    }
    return totalSeat;
  }


  getStatus(status: boolean) {
    if (status == true) {
      return "Đang hoạt động"
    } else {
      return "Đang sửa chữa"
    }
  }

  paginate(page: number) {
    if (page >= 0 && page < this.totalPage) {
      this.page = page;
      this.ngOnInit()
    }

  }


}

