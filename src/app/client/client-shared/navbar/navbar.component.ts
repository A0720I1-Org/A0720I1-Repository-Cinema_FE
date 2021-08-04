import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from 'src/app/service/share.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss','../scss/layout.scss','../scss/content.scss']
})
export class NavbarComponent implements OnInit {
  username: string;
  role: string;
  isLoggedIn : boolean = false;
  constructor(
    private tokenStorageService: TokenStorageService,
    private shareService: ShareService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  load() {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().account.username;
      this.role = this.tokenStorageService.getUser().roles[0];
    }
    this.isLoggedIn =  this.username != null;
  }
  ngOnInit(): void {
    this.load();
  }

}
