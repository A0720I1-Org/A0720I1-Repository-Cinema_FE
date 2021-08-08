import { IAccountDTO } from './../../phat-model/dto/IAccountDTO';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../member.component.scss','./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  textType: boolean = false;
  username :string;
  accountDTO : IAccountDTO ;
  errorMessage : string ;
  memberCode: string;
  showPass ="fas fa-eye";
  hidePass="fas fa-eye-slash"
  constructor(private tokenStorage: TokenStorageService,
    private toastrService: ToastrService,
   private router: Router,
   private accountService : AccountService) { }
   formChangePassword : FormGroup
  ngOnInit(): void {
    this.username = this.tokenStorage.getUser().account.username;
    this.memberCode = this.tokenStorage.getUser().membership.memberCode;
    this.formChangePassword = new FormGroup(
      {
        oldPassword: new FormControl(''),
        newPassword: new FormControl(''),
        confirmPassword: new FormControl('')
      }
    );
  }
  changePassword() {
    if(this.formChangePassword.valid) {
      console.log(this.formChangePassword.value);
      this.accountDTO = this.formChangePassword.value;
      this.accountService.changePassword(this.accountDTO).subscribe(
        () => {
          this.router.navigateByUrl("/").then(
            r => this.toastrService.success(
              "Đổi mật khẩu thành công",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        },
        (error: HttpErrorResponse) => {
            this.toastrService.error(
              error.error,
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
        }
      );
    }
  }
  toggleShowHide() {
    this.textType = !this.textType;
  }
}
