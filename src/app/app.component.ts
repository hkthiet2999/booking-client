import { Component } from '@angular/core';
import { AuthService } from './services/auth-service';
import { Role } from './_model/role';
import { User } from './_model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'booking-client';

  user: User;

  constructor(private authenticationService: AuthService) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
  }
}
