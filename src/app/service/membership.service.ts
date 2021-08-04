import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  httpOptions : any;
  private url = 'http://localhost:8080';
  constructor(private httpClient: HttpClient,  private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      // headers: new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ` + this.tokenStorage.getToken()
      // }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  getListMembership(page: number):Observable<any>{
    return this.httpClient.get<any>(this.url +"/api/admin/membership/get-list-membership?page="+page, this.httpOptions);
  }
  getMembershipById(id: number): Observable<any>{
    return this.httpClient.get<any>(this.url +"/api/admin/membership/update-membership/"+id, this.httpOptions);
  }
}
