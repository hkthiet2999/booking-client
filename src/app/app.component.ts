import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from './common/services/loading.service';
import { AuthService } from './services/auth-service';
import { Role } from './_model/role';
import { User } from './_model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'booking-client';

  user: User;

  constructor(private authenticationService: AuthService,
    public loadingService: LoadingService) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  // logout() {
  //   this.authenticationService.logout();
  // }
}
