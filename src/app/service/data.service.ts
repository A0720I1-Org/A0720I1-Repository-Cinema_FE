import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Showtime} from "../model/book-ticket/Showtime";
import {Seat} from "../model/book-ticket/Seat";
import {BookingInformation} from "../model/book-ticket/BookingInformation";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private filmStorage = new BehaviorSubject(null);
  private selectSeatStorage = new BehaviorSubject(null)
  private bookingStorage = new BehaviorSubject(null)
  showtime = this.filmStorage.asObservable();
  selectSeat = this.selectSeatStorage.asObservable();
  booking = this.bookingStorage.asObservable();

  constructor() { }

  setShowtime(showtime: Showtime){
    this.filmStorage.next(showtime);
  }

  setSelectSeat(seatList: Seat[]){
    this.selectSeatStorage.next(seatList)
  }

  setBooking(booking: BookingInformation){
    this.bookingStorage.next(booking)
  }

}
