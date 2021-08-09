import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {IFilmDTO} from "../dto/IFilmDTO";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private API_URL = environment.apiBaseUrl;
  httpOptions: any;

  constructor(
    private httpClient: HttpClient,
    private tokenStorageService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorageService.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getTopFilm(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/public/film/top-film", this.httpOptions);
  }

  getListUpComingFilmDTO(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/public/film/listUpComingFilm", this.httpOptions);
  }

  getListUpShowingFilmDTO(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/public/film/listUpShowingFilm", this.httpOptions);
  }

  searchUpComingFilmDTO(name: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/public/film/coming?name=" + name, this.httpOptions)
  }

  searchUpShowingFilmDTO(name: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/public/film/showing?name=" + name, this.httpOptions)
  }

  getFilmById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/public/film/film?id=" + id, this.httpOptions)
  }

  getListTicketPrice(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/public/ticket-price/list-ticket-price", this.httpOptions);
  }
}
