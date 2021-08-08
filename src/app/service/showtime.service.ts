import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

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

  getShowtimeList(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/member/showtime/get-showtime-showing", this.httpOptions);
  }

  getSeatList(showTimeId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/member/showtime/get-seat-of-showtime?showtimeId=" + showTimeId, this.httpOptions);
  }

  getCinemaRoomLayout(showTimeId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/member/showtime/get-cinema-room-layout?showtimeId=" + showTimeId, this.httpOptions);
  }

  getShowtimeByInvoiceId(invoiceId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/member/showtime/get-showtime-by-invoice-id?invoiceId=" + invoiceId, this.httpOptions);
  }

  getPaymentMethodList(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/member/showtime/get-payment-method-list", this.httpOptions);
  }

  //vu
  createShowtime(createShowtimeDTO: any):Observable<any>{
    return this.httpClient.post<any>(this.API_URL +"/api/member/showtime/create" ,createShowtimeDTO,this.httpOptions)
  }
  getListFilm():Observable<any>{
    return this.httpClient.get<any>(this.API_URL +"/api/member/showtime/listFilm",this.httpOptions)
  }

  getListCinemaRoom():Observable<any>{
    return this.httpClient.get<any>(this.API_URL +"/api/member/showtime/listCinemaRoom",this.httpOptions)
  }
}
