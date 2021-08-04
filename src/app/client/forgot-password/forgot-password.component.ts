import { ShareService } from 'src/app/service/share.service';
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
  @ViewChild('resetPassword', { static: true }) resetPW: TemplateRef<any>;
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
  private shareService : ShareService,
  private dialog: MatDialog
   ) {
   }

  ngOnInit(): void {
    if(this.tokenStorage.getTokenSession()) {
      this.shareService.sendClickEvent();
          this.router.navigate(["/"]);
    }
  }
  onSendSubmit(username:string){
    this.error='';
    if(!username) return;
    this.dialog.open(this.loading,{
      width: '150px',
      height:'125px',
    });
    this.accountService.forgotPassword(username).subscribe((data) => {
      this.dialog.closeAll();
      this.isShowOtp=true;
      this.code = data;
      console.log(data)
    },err=> {
      this.error= err.error;
      setTimeout(()=>{ this.dialog.closeAll(); }, 100);
    })
  }
  onSendChangePW(){
    if(this.otp == this.code) {
      this.accountService.resetPassword(this.username).subscribe((data) => {
        this.dialog.open(this.resetPW,{
          width: '300px',
          height:'auto',
          panelClass: 'custom-dialog-container'
        });
      },err=> {
      })
      }
    if(this.count === 0) {
     this.router.navigateByUrl('/').then(()=> {
       this.toastr.error(
         'Cập nhật mật khẩu không thành công,vui lòng thử lại',
        "Lỗi",
        {timeOut: 3000, extendedTimeOut: 1500})
     })
    }
      else{
        this.count--;
        this.errorOTP = "Bạn còn " + this.count + ' lượt nhập';
      }
    }
    onSignin(){
      this.router.navigateByUrl("/member/login");
      this.dialog.closeAll();
    }
  }
