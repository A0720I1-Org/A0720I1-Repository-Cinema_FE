import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShowtimeModule} from "../showtime.module";
import {ShowtimeService} from "../../../service/showtime.service";
import {Router} from "@angular/router";
import {Time} from "@angular/common";
import {DTOCreateShowtime} from "../dto/DTOCreateShowtime";
import {DTOCinemaRoom} from "../../cinema-room/dto/DTOCinemaRoom";
import {SeatCreateDTO} from "../dto/SeatCreateDTO";
import {ShowtimeDataDTO} from "../dto/ShowtimeDataDTO";

@Component({
  selector: 'app-create-showtime',
  templateUrl: './create-showtime.component.html',
  styleUrls: ['./create-showtime.component.scss']
})
export class CreateShowtimeComponent implements OnInit {
  createForm: FormGroup;
  films: any;
  cinemaRooms: any;
  room: DTOCinemaRoom;
  // timeArr: Time[] = [{hours: 11, minutes: 0}, {hours: 13, minutes: 30}, {hours: 16, minutes: 0},
  //   {hours: 18, minutes: 30}, {hours: 21, minutes: 0}, {hours: 23, minutes: 30}];
  // timeCheck: Time[] = [];
  timeArr: string[] = ['11:00:00', '13:30:00', '16:00:00', '18:30:00', '21:00:00', '23:30:00'];
  timeCheck: string[] = [];
  timeString: any;
  seatList: SeatCreateDTO[] = [];

  constructor(private showtimeService: ShowtimeService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getListCinemaRoom();
    this.getListFilm();
    this.initForm();
  }

  initForm() {
    this.createForm = new FormGroup({
      filmId: new FormControl("", [Validators.required]),
      day: new FormControl("", [Validators.required]),
      cinemaRoomId: new FormControl("", [Validators.required]),
      filmTechnology: new FormControl("", [Validators.required]),
      time: new FormControl("", [Validators.required]),
      subTitle: new FormControl("", [Validators.required]),
    })
  }

  onSubmit() {
    let showtimeArr = [];
    for (let time of this.timeCheck){
      let showtime = new DTOCreateShowtime(this.createForm.get('filmId').value, this.createForm.get('cinemaRoomId').value,
        this.createForm.get('day').value, time, this.createForm.get('filmTechnology').value,
        this.createForm.get('subTitle').value)
      showtimeArr.push(showtime)
    }

    this.seatList = [];
    for (let row=0; row < this.room.rowSeat; row++ ){
      for (let column=0; column < this.room.columnSeat; column++){
        let seat = new SeatCreateDTO();
        if (this.room.seatLayout[row * this.room.columnSeat + column] != 'n'){
          seat.name=this.getSeatName(row, column)
          seat.code= this.room.seatLayout[row * this.room.columnSeat + column]
        } else {
          seat.name='';
          seat.code=this.room.seatLayout[row * this.room.columnSeat + column];
        }
        this.seatList.push(seat)
      }
    }
    console.log(this.seatList)
    let showtimeData = new ShowtimeDataDTO();
    showtimeData.showtimeList = showtimeArr;
    showtimeData.seatList = this.seatList;
      this.showtimeService.createShowtime(showtimeData).subscribe(
        data => console.log("them thanh cong"),
        error => console.log(error.message)
      )

  }

  getListFilm() {
    this.showtimeService.getListFilm().subscribe(data => {
      this.films = data
    })
  }

  getListCinemaRoom() {
    this.showtimeService.getListCinemaRoom().subscribe(data => {
      this.cinemaRooms = data
    })
  }

  getTime(time: Time) {
    // @ts-ignore
    if(this.timeCheck != null){
      // @ts-ignore
      if (this.timeCheck.indexOf(time) == -1) {
        // @ts-ignore
        this.timeCheck.push(time)
      } else {
        // @ts-ignore
        this.timeCheck.splice(this.timeCheck.indexOf(time), 1)
      }
    }else {
      // @ts-ignore
      this.timeCheck.push(time)
    }
  }


  getSeatName(row: number, column: number) {
    let r = 0;
    let spaceRow = 0;
    for (let i = 0; i<=column; i++){
      if (this.room.seatLayout[row*this.room.columnSeat + i] != 'n') {
        r++
      }
    }
    for (let j = 0; j <= row; j++){
      let countSpace = 0;
      for (let k = 0; k < this.room.columnSeat; k++){
        if (this.room.seatLayout[j*this.room.columnSeat + k] == 'n'){
          countSpace++;
        }
      }
      if (countSpace == this.room.columnSeat){
        spaceRow++;
      }
    }
    if (this.room.seatLayout[row*this.room.columnSeat + column] != 'n'){
      return String.fromCharCode(65 + row - spaceRow) + r;
    } else {
      return '';
    }

  }

  getRoom() {
    for (let room of this.cinemaRooms){
      if (this.createForm.get('cinemaRoomId').value == room.id){
        this.room = room
      }
    }
  }
}
