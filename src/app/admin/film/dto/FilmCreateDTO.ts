export class FilmCreateDTO {
  name: string;
  imageURL: string;
  startDate: string;
  endDate: string;
  actors: string;
  studio: string;
  duration: number;
  directors: string;
  trailers: string;
  category: string;
  description: string;
  age: string;

  constructor(name: string, imageURL: string, startDate: string, endDate: string, actors: string, studio: string, duration: number, directors: string, trailers: string, category: string, description: string, age: string) {
    this.name = name;
    this.imageURL = imageURL;
    this.startDate = startDate;
    this.endDate = endDate;
    this.actors = actors;
    this.studio = studio;
    this.duration = duration;
    this.directors = directors;
    this.trailers = trailers;
    this.category = category;
    this.description = description;
    this.age = age;
  }
}
