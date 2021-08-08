import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private tokenStorageService: TokenStorageService,
    private toastrService: ToastrService) { }
    canActivate(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
              ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
const currentUrl = this.router.url;
const loggedInUser = this.tokenStorageService.getUser();
if (loggedInUser !== null) {
let role = loggedInUser.roles[0];
console.log(role)
if (route.data.roles.indexOf(role) !== -1) {
console.log(route.data.roles.indexOf(role))
return true;
} else {
this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  this.router.navigate([currentUrl]);
});
this.toastrService.warning(
  "Bạn không có quyền truy cập trang này",
  "Cảnh báo",
  {timeOut: 3000, extendedTimeOut: 1500}
)
return false
}
} else {
this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
this.router.navigate([currentUrl]);
});
this.toastrService.warning(
"Bạn không có quyền truy cập trang này",
"Cảnh báo",
{timeOut: 3000, extendedTimeOut: 1500}
)
return false
}
}
}
