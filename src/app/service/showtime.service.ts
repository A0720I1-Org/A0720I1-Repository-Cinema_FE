import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {


  private url = 'http://localhost:8080/';

  constructor(private httpClient:HttpClient) {
  }


  createShowtime(createShowtimeDTO: any):Observable<any>{
    return this.httpClient.post<any>(this.url +"admin/showtime/create" ,createShowtimeDTO)
  }
  getListFilm():Observable<any>{
    return this.httpClient.get<any>(this.url +"api/admin/showtime/listFilm")
  }

  getListCinemaRoom():Observable<any>{
    return this.httpClient.get<any>(this.url +"api/admin/showtime/listCinemaRoom")
  }



}
