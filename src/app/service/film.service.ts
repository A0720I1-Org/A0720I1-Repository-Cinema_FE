import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilmUpdateDTO} from "../admin/film/dto/FilmUpdateDTO";
import {FilmCreateDTO} from "../admin/film/dto/FilmCreateDTO";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private API_URL = environment.apiBaseUrl;
  httpOptions: any;
  constructor(
    private httpClient: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorageService.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }


  getListFilm(page: number): Observable<any> {
    return this.httpClient.get<any[]>(this.API_URL + '/api/admin/film/list?page='+ page, this.httpOptions);
  }

  getFilmById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/admin/film/find/' + id, this.httpOptions);
  }

  updateFilm(filmUpdateDTO: FilmUpdateDTO): Observable<any> {
    return this.httpClient.put<any>(this.API_URL + '/api/admin/film/update',JSON.stringify( filmUpdateDTO), this.httpOptions);
  }

  createFilm(filmCreateDTO: any): Observable<any> {
    return this.httpClient.post<FilmCreateDTO>(this.API_URL + '/api/admin/film/create', JSON.stringify(filmCreateDTO), this.httpOptions);
  }

  deleteFilm(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.API_URL + '/api/admin/film/delete/' + id, this.httpOptions);
  }

  searchByName(name: string, page: number): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + '/api/admin/film/search?name=' + name + '&page=' + page, this.httpOptions);
  }

  searchByNameAndStartDate(name: string, startDate: string, page: number): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + '/api/admin/film/search?name=' + name + '&date=' + startDate + '&page=' + page, this.httpOptions);
  }
}
