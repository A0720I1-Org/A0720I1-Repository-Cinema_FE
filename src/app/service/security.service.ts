import { ISocialResponse } from './../client/phat-model/dto/ISoclalResponse';
import { ILoginRequest } from './../client/phat-model/entity/ILoginRequest';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const API_URL_GOOGLE: string = 'http://localhost:8080/api/public/oauth/google';
const API_URL_FACEBOOK: string = 'http://localhost:8080/api/public/oauth/facebook';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  httpOptions: any;
  isLoggedIn: boolean;
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
   login(obj:any):Observable<any>{
     return this.http.post(this.AUTH_API + '/api/public/login',{
      username: obj.username,
      password: obj.password
    },this.httpOptions)
   }
   loginGoogle(obj): Observable<any> {
    return this.http.post(API_URL_GOOGLE , obj, this.httpOptions);
  }

  loginFacebook(jwtResponse: ISocialResponse): Observable<any> {
    return this.http.post(API_URL_FACEBOOK, jwtResponse, this.httpOptions);
  }
}
