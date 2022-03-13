import { UserService } from './../services/user.services';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UserInterface } from '../users.interface';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../components/profile-edit/profile-edit.component';
import { AuthService } from 'app/services/auth-service';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss'],
})
export class ProfileMainComponent implements OnInit {

  user: any;
  userValue!: any;

  constructor(private authService: AuthService, private userService: UserService,
    public dialog: MatDialog,) {}

  ngOnInit() {
    this.userValue = this.authService.userValue;
    this.userService
      .findUserBy(this.userValue.id)
      .subscribe((data: any) => {
        console.log(data);
        this.user = data;
      });
  }

  onClickUpdatedUser(){
    const dialogRef = this.dialog.open(EditProfileComponent, {
      height: '35vw',
      width: '60vw',
    })

    dialogRef.afterClosed().subscribe((result) => {
      this.userService
      .findUserBy(this.userValue.id)
      .subscribe((data: any) => {
        console.log(data);
        this.user = data;
      });
    });
  }
}
