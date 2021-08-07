import { Injectable } from '@angular/core';
import {BookingInformation} from "../model/book-ticket/BookingInformation";
import {Showtime} from "../model/book-ticket/Showtime";
import {Seat} from "../model/book-ticket/Seat";

@Injectable({
  providedIn: 'root'
})

export class BookingStorageService {
  BOOKING_KEY = 'booking';
  SHOWTIME_KEY = 'showtime';
  SEATS_KEY = 'seats';
  constructor() { }

  public saveBookingLocal(booking: BookingInformation) {
    window.localStorage.removeItem(this.BOOKING_KEY);
    window.localStorage.setItem(this.BOOKING_KEY, JSON.stringify(booking));
  }

  public getBooking(): BookingInformation {
      return JSON.parse(localStorage.getItem(this.BOOKING_KEY));
  }

  public saveShowtimeLocal(showtime: Showtime) {
    window.localStorage.removeItem(this.SHOWTIME_KEY);
    window.localStorage.setItem(this.SHOWTIME_KEY, JSON.stringify(showtime));
  }

  public getShowtime(): Showtime {
    return JSON.parse(localStorage.getItem(this.SHOWTIME_KEY));
  }

  public saveSeatsLocal(seats: Seat[]) {
    window.localStorage.removeItem(this.SEATS_KEY);
    window.localStorage.setItem(this.SEATS_KEY, JSON.stringify(seats));
  }

  public getSeats(): Seat[] {
    return JSON.parse(localStorage.getItem(this.SEATS_KEY));
  }

  public clear(){
    window.localStorage.removeItem(this.BOOKING_KEY);
    window.localStorage.removeItem(this.SHOWTIME_KEY);
    window.localStorage.removeItem(this.SEATS_KEY);
  }
}
