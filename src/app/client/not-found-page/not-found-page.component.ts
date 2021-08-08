import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {
  loggedInUser='';
  constructor(private router: Router,
    private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    const loggedInUser = this.tokenStorageService.getUser();
  }
  checkLogin() {
    if (this.loggedInUser!=null) {
      this.router.navigate(['/member/login'], { state: { redirect: this.router.url } });
    }
  }
}
