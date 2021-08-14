import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {BookingInformation} from "../model/book-ticket/BookingInformation";
import {Observable} from "rxjs";
import {Payment} from "../model/book-ticket/Payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
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

  payByPaypal(payment: Payment): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + "/api/public/paypal/pay", payment, this.httpOptions);
  }
}
