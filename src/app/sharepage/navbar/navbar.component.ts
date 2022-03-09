import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { Role } from 'src/app/_model/role';
import { User } from 'src/app/_model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthService) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {}

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
  }
}
