export class FilmViewDTO {
  id: number;
  name: string;
  imageURL: string;
  startDate: string;
  endDate: string;
  actors: string;
  studio: string;
  durations: number;
  directors: string;
  trailers: string;
  category: string;
  descriptions: string;
  age: string;
  filmTechnology: string;
  subTitle: string;


  constructor() {
    this.id = 0;
    this.name = '';
    this.imageURL = '';
  }
}
