import { HttpErrorResponse } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { IStaffDTO } from '../staffDto/ListStaffDto';


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
})
export class StaffListComponent implements OnInit {

  page = 0;
  totalPage: number;
  staff: IStaffDTO;

  public deleteEmployee: IStaffDTO;

  public listStaff: IStaffDTO[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getListStaff();
  }


  getListStaff(): void {
    this.employeeService.getAllStaff(this.page).subscribe((data) => {
      this.listStaff = data.content;
      console.log(data);
      this.totalPage = data.totalPages;
    })
  }

  paginate(page: number) {
    if (page >= 0 && page < this.totalPage) {
      this.page = page;
      this.ngOnInit()
    }

  }

  deleteStaffById(id: number) {
    this.employeeService.deleteEmployeeById(id).subscribe(
      (response: void) => {
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchStaffByKey(key: string): void {
    console.log(key);
    const results: IStaffDTO[] = [];
    for (const employee of this.listStaff) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.listStaff = results;
    if (results == null || !key) {
      this.getListStaff();
    }

  }

  public onOpenModal(employee: IStaffDTO, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }



}
