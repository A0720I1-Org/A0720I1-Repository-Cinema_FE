import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  httpOptions : any;
  AUTH_API = environment.apiBaseUrl;
  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + this.tokenStorage.getToken()
        }),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      };
     }
     public getAllTicket(page:number): Observable<any> {
       const id = this.tokenStorage.getUser().membership.id;
      return this.http.get<any>(this.AUTH_API + '/api/member/ticket?id='+id+'&page='+page,this.httpOptions);
    }
}
