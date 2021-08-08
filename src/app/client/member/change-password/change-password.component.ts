import { IAccountDTO } from './../../phat-model/dto/IAccountDTO';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  hidePass="fas fa-eye-slash";
  listError:any='';
  constructor(private tokenStorage: TokenStorageService,
    private toastrService: ToastrService,
   private router: Router,
   private accountService : AccountService,
   private formBuilder:FormBuilder,
   private el: ElementRef) { }
   formChangePassword : FormGroup
  ngOnInit(): void {

    this.username = this.tokenStorage.getUser().account.username;
    this.memberCode = this.tokenStorage.getUser().membership.memberCode;
    this.formChangePassword = this.formBuilder.group({
      oldPassword:['',[Validators.required, Validators.minLength(6), Validators.maxLength(45), Validators.pattern(/^[A-Za-z0-9]*$/)]],
      newPassword:['',[Validators.required, Validators.minLength(6), Validators.maxLength(45), Validators.pattern(/^[A-Za-z0-9]*$/)]],
      confirmPassword:['']
    },{
      validators: [ConfirmPasswordValidator,OldNewPassword]
    },)
  }
  changePassword() {
    if(this.formChangePassword.invalid){
      for (const key of Object.keys(this.formChangePassword.controls)) {
        if (this.formChangePassword.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          this.formChangePassword.get(key).markAsTouched();
          invalidControl.focus();
          break;
       }
     }
    }
    else{
      console.log(this.formChangePassword.value);
      this.accountDTO = this.formChangePassword.value;
      this.accountService.changePassword(this.accountDTO).subscribe(
        () => {
          this.router.navigateByUrl("/").then(
            r => this.toastrService.success(
              "Đổi mật khẩu thành công",
              "Thông báo",
              {timeOut: 3000})
          )
        },
        (error: HttpErrorResponse) => {
          this.toastrService.error(
            "Thay đổi mật khẩu thất bại",
            "Thông báo",
            {timeOut: 3000})
            this.listError = error.error;
        }
      );
    }
  }
  toggleShowHide() {
    this.textType = !this.textType;
  }
 validationMessage = {
    'oldPassword': [
      {type: 'required', message: 'Mật khẩu cũ không được để trống!'},
      {type: 'minlength', message: 'Mật khẩu cũ phải chứa nhiều hơn 6 kí tự!'},
      {type: 'maxlength', message: 'Mật khảu cũ chỉ chứa ít hơn 45 kí tự!'},
      {type: 'pattern', message: 'Mật khẩu cũ không được chứa kí tự đặc biệt!'}
    ],
    'newPassword': [
      {type: 'required', message: 'Mật khẩu mới không được để trống!'},
      {type: 'minlength', message: 'Mật khẩu mới phải chứa nhiều hơn 6 kí tự!'},
      {type: 'maxlength', message: 'Mật khảu mới chỉ chứa ít hơn 45 kí tự!'},
      {type: 'failPassword', message: 'Mật khẩu mới không được trùng mật khẩu cũ!'},
      {type: 'pattern', message: 'Mật khẩu mới không được chứa kí tự đặc biệt!'}
    ],
    'confirmPassword': [
      {type: 'required', message: 'Xác nhận mật khẩu không được để trống!'},
      {type: 'minlength', message: 'Xác nhận mật khẩu phải chứa nhiều hơn 6 kí tự!'},
      {type: 'maxlength', message: 'Xác nhận mật khẩu chỉ chứa ít hơn 45 kí tự!'},
      {type: 'notMatchPassword',message: 'Xác nhận mật khẩu phải giống mật khẩu mới!'},
      {type: 'pattern', message: 'Xác nhận mật khẩu không được chứa kí tự đặc biệt!'}
    ]
  };
}
function ConfirmPasswordValidator(group: FormGroup) {
  const password = group.get('newPassword').value;
  const rePassword = group.get('confirmPassword').value;
  return rePassword === password  ? null : {notMatchPassword: true};
}
  function OldNewPassword(group: FormGroup) {
  const oldPassword = group.get('oldPassword').value;
  const newPassword = group.get('newPassword').value;
  return oldPassword !== newPassword  ? null : {failPassword: true};
}
