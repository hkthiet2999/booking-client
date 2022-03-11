import { UserService } from 'app/users/services/user.services';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'app/services/auth-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss'],
})
export class UserActionComponent implements OnInit {
  user!: any;
  userId!: string;
  isUploadAvatar!: any
  isAdmin!: any

  constructor(
    private authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit(): void {


    this.userService.isUploadAvatar$.subscribe((isUploadAvatar) =>{
      if(isUploadAvatar){
        this.userService.findUserBy(this.userId).subscribe((data) => {
          this.user = data;
        });
      }

    } );

    //
    this.isAdmin = this.authService.userValue.role === 'admin' ? true : false ;
    
    this.userId = this.authService.userValue.id;

    this.userService.findUserBy(this.userId).subscribe((data) => {
      this.user = data;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  logout() {
    this.authService.logout();
  }

}
