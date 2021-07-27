import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CinemaRoomService {

  private url = 'http://localhost:8080/';
  constructor(private httpClient:HttpClient) {
  }
  getAllListCinemaRoom():Observable<any>{
    return this.httpClient.get<any>(this.url +"admin/cinema-room/list");
  }

  getCinemaRoomById(id:number):Observable<any>{
    return this.httpClient.get<any>(this.url +"admin/cinema-room/detail/"+id);
  }
}
