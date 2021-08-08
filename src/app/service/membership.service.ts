import { IMembershipUpdateDTO } from './../client/phat-model/dto/IMembershipUpdateDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
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
  public update(membership : IMembershipUpdateDTO):Observable<any> {
    return this.http.put(this.AUTH_API + '/api/member/membership/',membership,this.httpOptions);
  }
  public getById(id:any):Observable<any> {
    return this.http.get(this.AUTH_API + '/api/member/membership/'+id,this.httpOptions);
  }
}
