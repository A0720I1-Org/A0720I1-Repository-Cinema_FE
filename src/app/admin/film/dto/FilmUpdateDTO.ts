export class FilmUpdateDTO {
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



  constructor(id: number, name: string, imageURL: string, startDate: string, endDate: string, actors: string, studio: string, durations: number, directors: string, trailers: string, category: string, descriptions: string, age: string) {
    this.id =id;
    this.name = name;
    this.imageURL = imageURL;
    this.startDate = startDate;
    this.endDate = endDate;
    this.actors = actors;
    this.studio = studio;
    this.durations = durations;
    this.directors = directors;
    this.trailers = trailers;
    this.category = category;
    this.descriptions = descriptions;
    this.age = age;
  }
}
