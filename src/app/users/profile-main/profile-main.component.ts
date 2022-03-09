import { UserService } from './../services/user.services';
import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../users.interface';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../components/profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss'],
})
export class ProfileMainComponent implements OnInit {
  // user!: UserInterface;

  // private userId = 'd8679948-57c4-4d3e-a078-0aae6aa3f73a'

  user: any;

  constructor(private userService: UserService,
    public dialog: MatDialog,) {}

  ngOnInit() {

    console.log('In here 1');
    this.userService
      .findUserBy('d8679948-57c4-4d3e-a078-0aae6aa3f73a')
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
      .findUserBy('d8679948-57c4-4d3e-a078-0aae6aa3f73a')
      .subscribe((data: any) => {
        console.log(data);
        this.user = data;
      });
    });
  }
}
