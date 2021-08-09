export class DTOCreateShowtime {
  filmId:number;
  cinemaRoomId:number;
  day:Date;
  time:string;
  filmTechnology:string;
  subTitle:string;

  constructor(filmId: number, cinemaRoomId: number, day: Date, time: string, filmTechnology: string, subTitle: string) {
    this.filmId = filmId;
    this.cinemaRoomId = cinemaRoomId;
    this.day = day;
    this.time = time;
    this.filmTechnology = filmTechnology;
    this.subTitle = subTitle;
  }
}
