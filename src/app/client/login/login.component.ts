import { ToastrService } from 'ngx-toastr';
import { ShareService } from './../../service/share.service';
import { SecurityService } from './../../service/security.service';
import { IMembership } from './../phat-model/entity/IMembership';
import { ILoginRequest } from './../phat-model/entity/ILoginRequest';
import { ISocialResponse } from './../phat-model/dto/ISoclalResponse';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccount } from '../phat-model/entity/IAccount';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  textType: boolean = false;
  showPass ="fas fa-eye";
  hidePass="fas fa-eye-slash"
  loginForm: FormGroup;
  account: ILoginRequest;
  socialUser: SocialUser;
  userLogged: SocialUser;
  isError = false;
  membership:IMembership;
  username: string;
  roles: string[] = [];
  socialResponse : ISocialResponse = null;
  error :any='';
  constructor(
              private router: Router,
              private form: FormBuilder,
              private tokenStorage: TokenStorageService,
              private auth: SocialAuthService,
              private authService: SecurityService,
              private shareService: ShareService,
              private toastr : ToastrService
              ) {
                this.shareService.getClickEvent().subscribe(() => {
                  this.ngOnInit()
                })
               }

  ngOnInit(): void {
    this.loginForm = this.form.group({
      username: ['', [Validators.required, Validators.pattern("^[0-9A-Za-z]*$")]],
      password: ['', Validators.required],
      remember: false
    });
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.authService.isLoggedIn = user !== null;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        if (this.loginForm.value.remember){
          this.tokenStorage.saveTokenLocal(data.token);
          this.tokenStorage.saveUserLocal(data)
        } else {
          this.tokenStorage.saveTokenSession(data.token);
          this.tokenStorage.saveUserSession(data)
        }
        this.authService.isLoggedIn = true;
        this.username = this.tokenStorage.getUser().username;
        this.roles = this.tokenStorage.getUser().roles;
        this.loginForm.reset();
        this.shareService.sendClickEvent();
        this.router.navigate(["/"]);
      },
      err => {
        this.error = err.error;
        this.toastr.error(
            err.error.message,
            "Thông tin đăng nhập không chính xác",
            {timeOut: 3000, extendedTimeOut: 1500}
          )
      }
    );
  }
  signInWithGoogle(): void {
    this.auth.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      console.log(data)
      this.socialUser = data;
      const tokenGoogle = this.socialUser.idToken;
      this.authService.loginGoogle({token : tokenGoogle}).subscribe(data => {
          this.tokenStorage.saveTokenSession(data.token);
          this.tokenStorage.saveUserSession(data)
          this.shareService.sendClickEvent();
          this.router.navigateByUrl("/");
        },
        error => {
          console.log("đay la error " + error)
          this.logOut()
        })
    }).catch(
      err => {
        console.log(err)
      }
    );
  }
  logOut(): void {
    this.auth.signOut().then(
      data => {
        this.tokenStorage.signOut();
        window.location.reload();
      }
    );
  }
  toggleShowHide() {
    this.textType = !this.textType;
  }
}
