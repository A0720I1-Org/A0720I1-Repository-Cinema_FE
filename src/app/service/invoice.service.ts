import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  httpOptions : any;
  AUTH_API = environment.apiBaseUrl;
  constructor(private http: HttpClient,private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
   }
   public getTicketAll(page:any):Observable<any> {
    return this.http.get(this.AUTH_API + '/api/public/invoice?page='+page,this.httpOptions);
  }
  public updateTicketPrinted(id:any):Observable<any> {
    return this.http.put(this.AUTH_API + '/api/public/invoice/'+id,this.httpOptions);
  }
  public getTicketAllBySearch(page:any,key:string):Observable<any> {
    return this.http.get(this.AUTH_API + '/api/public/invoice/'+key+'?page='+page,this.httpOptions);
  }
}
