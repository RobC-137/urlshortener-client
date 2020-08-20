import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loggedIn;
  currentRoute;
  nextRoute = '/';
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loggedIn = this.auth.getCurrentUSer();
    // .subscribe((data) => {
    //   console.log(data);
    // });
  }

  setRoute = (route) => {
    this.nextRoute = route;
    this.router.navigate([route]);
  };
  route() {
    const login = this.auth.getUserValue();
    this.currentRoute = this.router.url;
    // console.log(btn.localeCompare('auth'));

    // if (login) {
    //   if (!btn.localeCompare('action')) {
    //     if (!this.currentRoute.localeCompare('/')) this.setRoute('/statistics');
    //     if (!this.currentRoute.localeCompare('/statistics')) this.setRoute('/');
    //   }
    //   if (!btn.localeCompare('auth')) {
    //     this.auth.logout();
    //     this.setRoute('/');
    //   }
    // } else {
    //   if (!btn.localeCompare('action')) {
    //     this.setRoute('/');
    //   }
    //   if (!btn.localeCompare('auth')) this.setRoute('/auth');
    // }

    // if (!btn.localeCompare('auth')) {
    if (!login) this.setRoute('/auth');
    if (login) {
      this.auth.logout();
      this.setRoute('/');
      // this.router.navigate(['/']);
    }
    // }
  }
}
