import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

  private API_URL = environment.apiBaseUrl;
  AUTH_API = environment.apiBaseUrl;
  httpOptions: any;

  constructor(
    private http: HttpClient,
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
    return this.http.get<any>(this.API_URL + "/api/public/showtime/get-showtime-showing", this.httpOptions);
  }

  getSeatList(showTimeId: number): Observable<any> {
    return this.http.get<any>(this.API_URL + "/api/public/showtime/get-seat-of-showtime?showtimeId=" + showTimeId, this.httpOptions);
  }

  getCinemaRoomLayout(showTimeId: number): Observable<any> {
    return this.http.get<any>(this.API_URL + "/api/public/showtime/get-cinema-room-layout?showtimeId=" + showTimeId, this.httpOptions);
  }

  getShowtimeByInvoiceId(invoiceId: number): Observable<any> {
    return this.http.get<any>(this.API_URL + "/api/member/showtime/get-showtime-by-invoice-id?invoiceId=" + invoiceId, this.httpOptions);
  }

  getPaymentMethodList(): Observable<any> {
    return this.http.get<any>(this.API_URL + "/api/public/showtime/get-payment-method-list", this.httpOptions);
  }

}
