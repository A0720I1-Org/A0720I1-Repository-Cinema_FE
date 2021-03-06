import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
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

  getTicketListByInvoiceId(invoiceId: number): Observable<any> {
    return this.http.get<any>(this.API_URL + "/api/member/ticket/get-ticket-by-invoice-id?invoiceId=" + invoiceId, this.httpOptions);
  }

  public getAllTicket(page: number): Observable<any> {
    const id = this.tokenStorageService.getUser().membership.id;
    return this.http.get<any>(this.AUTH_API + '/api/member/ticket?id=' + id + '&page=' + page, this.httpOptions);
  }
  getShowtimeList(): Observable<any> {
    return this.http.get<any>(this.API_URL + "/api/public/showtime/get-showtime-showing", this.httpOptions);
  }
}
