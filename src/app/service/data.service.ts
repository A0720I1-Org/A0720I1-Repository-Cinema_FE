import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Showtime} from "../model/book-ticket/Showtime";
import {Seat} from "../model/book-ticket/Seat";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private filmStorage = new BehaviorSubject(null);
  private selectSeatStorage = new BehaviorSubject(null)
  showtime = this.filmStorage.asObservable();
  selectSeat = this.selectSeatStorage.asObservable()

  constructor() { }

  setShowtime(showtime: Showtime){
    this.filmStorage.next(showtime);
  }

  setSelectSeat(seatList: Seat[]){
    this.selectSeatStorage.next(seatList)
  }

}
