import {Component, OnInit} from '@angular/core';
import {DTOCinemaRoom} from "../dto/DTOCinemaRoom";
import {CinemaRoomService} from "../../../service/cinema-room.service";

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

  constructor(private cinemaRoomService: CinemaRoomService) {
  }

  ngOnInit(): void {
    this.getSearchByName();
  }

  getSearchByName() {
    if (this.name == ''){
      this.cinemaRoomService.getAllListCinemaRoom(this.page).subscribe((data: any) => {
        this.listCinemaRoom = data.content;
        this.totalPage = data.totalPages;
      })
    }else {
      this.cinemaRoomService.getSearchByName(this.name, this.page).subscribe((data: any) => {
        this.listCinemaRoom = data.content;
        this.totalPage= data.totalPages;
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

