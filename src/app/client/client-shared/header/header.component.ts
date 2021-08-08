import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ShareService} from 'src/app/service/share.service';
import {TokenStorageService} from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../scss/layout.scss', '../scss/content.scss']
})
export class HeaderComponent implements OnInit {
  username: string;
  role: string;
  isLoggedIn: boolean = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private shareService: ShareService,
    private router: Router,
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.load()
    })
  }

  load() {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().account.username;
      this.role = this.tokenStorageService.getUser().roles[0];
    }
    this.isLoggedIn = this.username != null;
  }

  ngOnInit(): void {
    this.load();
  }

  logOut() {
    this.tokenStorageService.signOut();
    this.role = null;
    this.username = null;
    this.ngOnInit();
    this.router.navigateByUrl("/")
  }
}
