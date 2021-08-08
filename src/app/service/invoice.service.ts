import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {BookingInformation} from "../model/book-ticket/BookingInformation";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
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

  createInvoice(bookingInformation: BookingInformation): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + "/api/member/invoice/create-invoice", bookingInformation, this.httpOptions);
  }

  getInvoiceById(invoiceId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + "/api/member/invoice/get-invoice-by-id/" + invoiceId, this.httpOptions);
  }

  checkSeatAvailable(bookingInformation: BookingInformation): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + "/api/member/invoice/check-seat-available",bookingInformation, this.httpOptions);
  }

}
