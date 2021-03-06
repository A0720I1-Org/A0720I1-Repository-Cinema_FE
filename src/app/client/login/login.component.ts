import { ToastrService } from 'ngx-toastr';
import { ShareService } from './../../service/share.service';
import { SecurityService } from './../../service/security.service';
import { IMembership } from './../phat-model/entity/IMembership';
import { ILoginRequest } from './../phat-model/entity/ILoginRequest';
import { ISocialResponse } from './../phat-model/dto/ISoclalResponse';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterStateSnapshot, RoutesRecognized } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import { filter, pairwise,map } from 'rxjs/operators';
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
  previousUrl = '';
  constructor(
              private router: Router,
              private route:ActivatedRoute,
              private form: FormBuilder,
              private tokenStorage: TokenStorageService,
              private auth: SocialAuthService,
              private authService: SecurityService,
              private shareService: ShareService,
              private toastr : ToastrService,
              private el: ElementRef,
              ) {
                this.shareService.getClickEvent().subscribe(() => {
                  this.ngOnInit()
                })
               }

  ngOnInit(): void {
    this.loginForm = this.form.group({
      username: ['', [Validators.required, Validators.pattern("^[0-9A-Za-z]*$"),Validators.maxLength(45),Validators.minLength(6)]],
      password: ['', [Validators.required,Validators.maxLength(45),Validators.minLength(6)]],
      remember: false
    });
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.authService.isLoggedIn = user !== null;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }
    if(this.tokenStorage.getTokenSession()) {
          this.router.navigate(['']);
    }
  }

  onSubmit() {
    if(this.loginForm.invalid){
      for (const key of Object.keys(this.loginForm.controls)) {
        if (this.loginForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          this.loginForm.get(key).markAsTouched();
          invalidControl.focus();
          break;
       }
  }
    }
    else{
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
          const { redirect } = window.history.state;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([redirect || '']);
        });
        },
        err => {
          this.toastr.error(
            "????ng nh???p kh??ng th??nh c??ng",
            "Th??ng b??o ",
            {timeOut: 3000, extendedTimeOut: 1500}
          )
          this.error = err.error;
        }
      );
    }
  }

  getPreviousUrl(){
    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.previousUrl = events[0].urlAfterRedirects;

    });
  }
  signInWithGoogle(): void {
    this.auth.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      console.log(data)
      this.socialUser = data;
      const tokenGoogle = this.socialUser.idToken;
      this.authService.loginGoogle({token : tokenGoogle}).subscribe(data => {
          this.tokenStorage.saveTokenSession(data.token);
          this.tokenStorage.saveUserSession(data)
          const { redirect } = window.history.state;
          console.log(redirect)
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([redirect || '']);
        });
        },
        error => {
          this.toastr.error(
            "Vui l??ng th??? l???i c??ch ????ng nh???p kh??c ",
            "????ng nh???p kh??ng th??nh c??ng",
            {timeOut: 3000, extendedTimeOut: 1500}
          )
          this.logOut()
        })
    }).catch(
      err => {
        console.log(err)
      }
    );
  }
  signInWithFacebook(): void {
    this.auth.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
      console.log(data)
      this.socialUser = data;
      const tokenFacebook = this.socialUser.authToken;
      this.authService.loginFacebook({token : tokenFacebook}).subscribe(data => {
          this.tokenStorage.saveTokenSession(data.token);
          this.tokenStorage.saveUserSession(data)
          const { redirect } = window.history.state;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([redirect || '']);
        });
        },
        error => {
          this.toastr.error(
            "Vui l??ng th??? l???i c??ch ????ng nh???p kh??c ",
            "????ng nh???p kh??ng th??nh c??ng",
            {timeOut: 3000, extendedTimeOut: 1500}
          ),
          this.logOut();
        })
    }).catch(
      err => {
        console.log(err);
        this.logOut();
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
  validationMessage = {
    'username': [
      {type: 'required', message: 'T??n ????ng nh???p kh??ng ???????c ????? tr???ng!'},
      {type: 'minlength', message: 'T??n ????ng nh???p  ph???i nhi???u h??n 6 k?? t???'},
      {type: 'maxlength', message: 'T??n ????ng nh???p ph???i ??t h??n 45 k?? t???'},
    ],
    'password': [
      {type: 'required', message: 'M???t kh???u kh??ng ???????c ????? tr???ng!'},
      {type: 'minlength', message: 'M???t kh???u ph???i nhi???u h??n 6 k?? t???'},
      {type: 'maxlength', message: 'M???t kh???u ph???i ??t h??n 45 k?? t???'},
      {type: 'pattern', message: 'M???t kh???u kh??ng ???????c ch???a k?? t??? ?????c bi???t'},
    ],
  };
}
