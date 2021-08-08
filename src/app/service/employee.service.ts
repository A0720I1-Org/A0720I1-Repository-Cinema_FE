import { IStaffDTO } from './../admin/staffs/staffDto/ListStaffDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StaffCreateDto } from '../admin/staffs/staffDto/StaffCreateDto';
import { TokenStorageService } from './token-storage.service';
import { IEmployee } from '../admin/staffs/staffDto/IEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  httpOptions : any;
  AUTH_API = environment.apiBaseUrl;
  private url = 'http://localhost:8080/';


  constructor(
    private httpClient:HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ` + this.tokenStorage.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllStaff(page: number):Observable<any>{
    return this.httpClient.get<any>(this.url + '/admin/staffs/list?page=' + page , this.httpOptions);
  }

  createStaff(staff: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/admin/staffs/create-staff', staff, this.httpOptions);
  }

  public getAllProvinces(): Observable<any> {
    return this.httpClient.get<any>(this.AUTH_API + '/api/public/province',this.httpOptions);
  }
  public getDistrictByProvince(provinceId): Observable<any> {
    return this.httpClient.get<any>(this.AUTH_API + '/api/public/district?provinceId=' + provinceId,this.httpOptions);
  }
  public getWardByDistrict(districtId): Observable<any> {
    return this.httpClient.get<any>(this.AUTH_API + '/api/public/ward?districtId=' + districtId,this.httpOptions);
  }
  
  public deleteEmployeeById(id:number):Observable<any> {
    return this.httpClient.delete<any>(this.AUTH_API + '/api/public/employee/'+ id , this.httpOptions);
  }

  public getByEmployeeId(id:number):Observable<any> {
    return this.httpClient.get<any>(this.AUTH_API + '/api/public/employee/'+ id , this.httpOptions);
  }

  public update(staff : any) {
    return this.httpClient.put<any>(this.AUTH_API + '/api/public/employee', staff, this.httpOptions)
  }



  


}
