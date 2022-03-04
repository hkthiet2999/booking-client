import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_model/user';
import { AuthService } from '../../services/auth-service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  user: User;

  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {
    this.user = this.authenticationService.userValue;
    
  }

  ngOnInit() {
    this.loading = true;
    // this.authenticationService.user.subscribe((x) => (this.user = x));
    // this.authenticationService.user.subscribe((user: User) => {
    //     if (!!user) {
    //       console.log(user.role);
    //       this.user = user;
    //     }
    //   });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
