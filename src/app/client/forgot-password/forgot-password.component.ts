import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('loading', { static: true }) loading: TemplateRef<any>;
  username:string;
  isShowOtp:boolean = false;
  code:string;
  error:any='';
  otp:string;
  errorOTP:string;
  count = 4;
  constructor(private tokenStorage: TokenStorageService,
  private toastr: ToastrService,
  private router: Router,
  private accountService : AccountService,
  private dialog: MatDialog
   ) {
   }

  ngOnInit(): void {
  }
  onSendSubmit(username:string){
    this.error='';
    if(!username) return;
    this.dialog.open(this.loading);
    this.accountService.forgotPassword(username).subscribe((data) => {
      console.log(data)
      this.dialog.closeAll();
      this.isShowOtp=true;
      this.code = data;
    },err=> {
      this.error= err.error;
      setTimeout(()=>{ this.dialog.closeAll(); }, 100);
    })
  }
  onSendChangePW(){
    console.log(this.count)
    if(this.count === 0) {
     this.router.navigateByUrl('/').then(()=> {
       this.toastr.error(
         'Cập nhật mật khẩu không thành công,vui lòng thử lại',
        "Lỗi",
        {timeOut: 3000, extendedTimeOut: 1500})
     })
    }

    if(this.otp == this.code) {
      this.accountService.resetPassword(this.username).subscribe((data) => {
        alert("Mật khẩu mởi của bạn là 12345678,Vui lòng đăng nhập để tiếp tục")
      },err=> {

      })
      }
      else{
        console.log(this.otp);
        console.log(this.code);
        this.count--;
        this.errorOTP = "Bạn còn " + this.count + ' lượt nhập';
      }
    }
  }
