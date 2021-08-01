import { IAccountDTO } from './../client/phat-model/dto/IAccountDTO';
import { IAccountMemberDTO } from './../client/phat-model/dto/IAccountMemberDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
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
  public getAllProvinces(): Observable<any> {
    return this.http.get<any>(this.AUTH_API + '/api/public/province',this.httpOptions);
  }
  public getDistrictByProvince(provinceId): Observable<any> {
    return this.http.get<any>(this.AUTH_API + '/api/public/district?provinceId=' + provinceId,this.httpOptions);
  }
  public getWardByDistrict(districtId): Observable<any> {
    return this.http.get<any>(this.AUTH_API + '/api/public/ward?districtId=' + districtId,this.httpOptions);
  }
  public register(memberAccountDTO : IAccountMemberDTO):Observable<any> {
    return this.http.post<any>(this.AUTH_API + '/api/public/register',memberAccountDTO,this.httpOptions);
  }
  public changePassword(accountDTO : IAccountDTO): Observable<any> {
    let username = this.tokenStorage.getUser().account.username;
    return this.http.put<any>(this.AUTH_API + '/api/public/change-password/'+ username, accountDTO,this.httpOptions);
  }
  public forgotPassword(username:string): Observable<any> {
    return this.http.put<any>(this.AUTH_API + '/api/public/forgot-password/'+ username,this.httpOptions);
  }
  public resetPassword(username:string): Observable<any> {
    return this.http.get<any>(this.AUTH_API + '/api/public/reset-password/'+ username,this.httpOptions);
  }
}
