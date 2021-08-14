import { Component, OnInit } from '@angular/core';
import {DTOCinemaRoom} from "../dto/DTOCinemaRoom";
import {ActivatedRoute} from "@angular/router";
import {CinemaRoomService} from "../../../service/cinema-room.service";

@Component({
  selector: 'app-detail-cinema-room',
  templateUrl: './detail-cinema-room.component.html',
  styleUrls: ['./detail-cinema-room.component.scss']
})
export class DetailCinemaRoomComponent implements OnInit {

  id:number=0;
  cinemaRoom = new DTOCinemaRoom() ;
  rows = [];
  columns = [];
  constructor(private cinemaRoomService:CinemaRoomService,
              private activatedRoute:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getCinemaRoomById();
  }

  getCinemaRoomById(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.cinemaRoomService.getCinemaRoomById(this.id).subscribe((data:DTOCinemaRoom)=>{
      this.cinemaRoom = data;
      console.log(this.cinemaRoom);
      this.rows = Array.from(Array(this.cinemaRoom.rowSeat).keys());
      this.columns = Array.from(Array(this.cinemaRoom.columnSeat).keys())
    })
  }

  getSeatName(row: any, column: any) {
    let r = 0;
    let spaceRow = 0;
    for (let i = 0; i<=column; i++){
      if (this.cinemaRoom.seatLayout[row*this.cinemaRoom.columnSeat + i] != 'n') {
        r++
      }
    }
    for (let j = 0; j <= row; j++){
      let countSpace = 0;
      for (let k = 0; k < this.cinemaRoom.columnSeat; k++){
        if (this.cinemaRoom.seatLayout[j*this.cinemaRoom.columnSeat + k] == 'n'){
          countSpace++;
        }
      }
      if (countSpace == this.cinemaRoom.columnSeat){
        spaceRow++;
      }
    }
    if (this.cinemaRoom.seatLayout[row*this.cinemaRoom.columnSeat + column] != 'n'){
      return String.fromCharCode(65 + row - spaceRow) + r;
    } else {
      return '';
    }

  }

}
