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
              "?????i m???t kh???u th??nh c??ng",
              "Th??ng b??o",
              {timeOut: 3000})
          )
        },
        (error: HttpErrorResponse) => {
          this.toastrService.error(
            "Thay ?????i m???t kh???u th???t b???i",
            "Th??ng b??o",
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
      {type: 'required', message: 'M???t kh???u c?? kh??ng ???????c ????? tr???ng!'},
      {type: 'minlength', message: 'M???t kh???u c?? ph???i ch???a nhi???u h??n 6 k?? t???!'},
      {type: 'maxlength', message: 'M???t kh???u c?? ch??? ch???a ??t h??n 45 k?? t???!'},
      {type: 'pattern', message: 'M???t kh???u c?? kh??ng ???????c ch???a k?? t??? ?????c bi???t!'}
    ],
    'newPassword': [
      {type: 'required', message: 'M???t kh???u m???i kh??ng ???????c ????? tr???ng!'},
      {type: 'minlength', message: 'M???t kh???u m???i ph???i ch???a nhi???u h??n 6 k?? t???!'},
      {type: 'maxlength', message: 'M???t kh???u m???i ch??? ch???a ??t h??n 45 k?? t???!'},
      {type: 'failPassword', message: 'M???t kh???u m???i kh??ng ???????c tr??ng m???t kh???u c??!'},
      {type: 'pattern', message: 'M???t kh???u m???i kh??ng ???????c ch???a k?? t??? ?????c bi???t!'}
    ],
    'confirmPassword': [
      {type: 'required', message: 'X??c nh???n m???t kh???u kh??ng ???????c ????? tr???ng!'},
      {type: 'minlength', message: 'X??c nh???n m???t kh???u ph???i ch???a nhi???u h??n 6 k?? t???!'},
      {type: 'maxlength', message: 'X??c nh???n m???t kh???u ch??? ch???a ??t h??n 45 k?? t???!'},
      {type: 'notMatchPassword',message: 'X??c nh???n m???t kh???u ph???i gi???ng m???t kh???u m???i!'},
      {type: 'pattern', message: 'X??c nh???n m???t kh???u kh??ng ???????c ch???a k?? t??? ?????c bi???t!'}
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
