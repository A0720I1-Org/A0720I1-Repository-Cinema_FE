import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/service/share.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  username: string;
  role: string;
  isLoggedIn : boolean = false;
  constructor(private tokenStorageService: TokenStorageService,
    private shareService: ShareService,
    private router: Router,) { }

  ngOnInit(): void {
  }
  logOut(){
      this.tokenStorageService.signOut();
      this.role = null;
      this.username = null;
      this.ngOnInit();
      this.router.navigateByUrl("/")
  }
}
