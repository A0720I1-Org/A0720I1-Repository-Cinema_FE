import {Time} from "@angular/common";

export class Showtime {
  showtimeId: number;
  filmId: number;
  filmName: string;
  filmCategory: string;
  filmActors: string;
  filmDirectors: string;
  filmDuration: number;
  filmAge: number;
  filmImageUrl: string;
  filmTechnology: string;
  subtitle: string;
  showtimeDay: Date;
  showtimeTime: Time;
  cinemaRoomId: number;
  cinemaRoomName: string;


  constructor() {
    this.showtimeId = 0;
    this.showtimeTime = {hours: null, minutes: null}
  }
}
