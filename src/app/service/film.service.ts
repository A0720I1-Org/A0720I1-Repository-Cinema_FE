import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {IFilmDTO} from "../dto/IFilmDTO";

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private API_URL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  getListUpComingFilmDTO(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/public/film/listUpComingFilm");
  }

  getListUpShowingFilmDTO(): Observable<IFilmDTO[]> {
    return this.httpClient.get<IFilmDTO[]>(this.API_URL + "/api/public/film/listUpShowingFilm");
  }

  searchUpComingFilmDTO(name: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/public/film/coming?name=" + name)
  }

  searchUpShowingFilmDTO(name: string) {
    return this.httpClient.get<any>(this.API_URL + "/api/public/film/showing?name=" + name)
  }
}
