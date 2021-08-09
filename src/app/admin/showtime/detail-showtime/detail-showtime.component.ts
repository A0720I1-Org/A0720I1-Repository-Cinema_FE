import { Component, OnInit } from '@angular/core';
import {DTOCinemaRoom} from "../../cinema-room/dto/DTOCinemaRoom";
import {CinemaRoomService} from "../../../service/cinema-room.service";
import {ActivatedRoute} from "@angular/router";
import {ShowtimeModule} from "../showtime.module";
import {ShowtimeService} from "../../../service/showtime.service";

@Component({
  selector: 'app-detail-showtime',
  templateUrl: './detail-showtime.component.html',
  styleUrls: ['./detail-showtime.component.scss']
})
export class DetailShowtimeComponent implements OnInit {

  // id:number=0;
  // cinemaRoom = new DTOCinemaRoom() ;
  // rows = [];
  // columns = [];
  constructor() {

  }

  ngOnInit(): void {
  }

  // getCinemaRoomById(){
  //   this.id = this.activatedRoute.snapshot.params['id'];
  //   this.cinemaRoomService.getCinemaRoomById(this.id).subscribe((data:DTOCinemaRoom)=>{
  //     this.cinemaRoom = data;
  //     console.log(this.cinemaRoom);
  //     this.rows = Array.from(Array(this.cinemaRoom.rowSeat).keys());
  //     this.columns = Array.from(Array(this.cinemaRoom.columnSeat).keys())
  //   })
  // }
  //
  // getSeatName(row: any, column: any) {
  //   let r = 0;
  //   let spaceRow = 0;
  //   for (let i = 0; i<=column; i++){
  //     if (this.cinemaRoom.seatLayout[row*this.cinemaRoom.columnSeat + i] != 'n') {
  //       r++
  //     }
  //   }
  //   for (let j = 0; j <= row; j++){
  //     let countSpace = 0;
  //     for (let k = 0; k < this.cinemaRoom.columnSeat; k++){
  //       if (this.cinemaRoom.seatLayout[j*this.cinemaRoom.columnSeat + k] == 'n'){
  //         countSpace++;
  //       }
  //     }
  //     if (countSpace == this.cinemaRoom.columnSeat){
  //       spaceRow++;
  //     }
  //   }
  //   if (this.cinemaRoom.seatLayout[row*this.cinemaRoom.columnSeat + column] != 'n'){
  //     return String.fromCharCode(65 + row - spaceRow) + r;
  //   } else {
  //     return '';
  //   }
  //
  // }


}
