export class FilmCreateError {
  name: string;
  imageURL: string;
  startDate: string;
  endDate: string;
  actors: string;
  studio: string;
  duration: number;
  trailers: string;
  directors: string;
  category: string;
  description: string;
  age: string;

  constructor(name: string, imageURL: string, startDate: string, endDate: string, actors: string, studio: string, duration: number, directors: string, trailers: string, category: string, description: string, age: string) {
    this.name = null;
    this.imageURL = null;
    this.startDate = null;
    this.endDate = null;
    this.actors = null;
    this.studio = null;
    this.duration = null;
    this.directors = null;
    this.trailers = null;
    this.category = null;
    this.description = null;
    this.age = null;
  }
}
