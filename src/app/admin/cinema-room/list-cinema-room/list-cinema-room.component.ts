import { Component, OnInit } from '@angular/core';
import {DTOCinemaRoom} from "../dto/DTOCinemaRoom";
import {CinemaRoomService} from "../../../service/cinema-room.service";

@Component({
  selector: 'app-list-cinema-room',
  templateUrl: './list-cinema-room.component.html',
  styleUrls: ['./list-cinema-room.component.scss']
})
export class ListCinemaRoomComponent implements OnInit {

  listCinemaRoom: DTOCinemaRoom[];

  constructor(private cinemaRoomService: CinemaRoomService) {
  }

  ngOnInit(): void {
    this.getAllListCinemaRoom();
  }

  getAllListCinemaRoom() {
    this.cinemaRoomService.getAllListCinemaRoom().subscribe((data: DTOCinemaRoom[]) => {
      this.listCinemaRoom = data;
    })
  }

  getTotalSeat(seatLayout: string) {
    let totalSeat = 0;
    for (let i = 0; i<= seatLayout.length; i++){
      if (seatLayout[i] == 's' || seatLayout[i] == 'v'){
        totalSeat++;
      }
    }
    return totalSeat;
  }

}
