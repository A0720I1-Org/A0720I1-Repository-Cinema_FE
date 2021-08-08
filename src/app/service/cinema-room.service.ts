import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CinemaRoomService {

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

  getAllListCinemaRoom(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/admin/cinema-room/list?page=" + page,this.httpOptions);
  }

  getCinemaRoomById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/admin/cinema-room/detail/" + id,this.httpOptions);
  }

  getSearchByName(name:string,page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/admin/cinema-room/search?name="+name + '&page='+page,this.httpOptions)
  }
}
