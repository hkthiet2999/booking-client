import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FakeRoomService } from 'src/app/services/fake-room.service';
import { User } from 'src/app/_model/user';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loading = false;
  user: User;
  roomData: any;

  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private roomService: FakeRoomService,
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
    this.roomData = this.roomService.roomList;
  }

  login() {
    this.router.navigate(['/login']);
  }
}
