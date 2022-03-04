import { UserService } from './../services/user.services';
import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../users.interface';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss'],
})
export class ProfileMainComponent implements OnInit {
  // user!: UserInterface;

  // private userId = 'd8679948-57c4-4d3e-a078-0aae6aa3f73a'

  user: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.user = {
    //   id: '51702187-aaa',
    //   email: 'harry.hoang@contemi.com',
    //   firstname: 'Harry',
    //   lastname: 'Hoang',
    //   gender: 'male',
    //   dateOfBirth: '',
    //   avatarUrl: '',
    //   role: 'user',
    // };

    this.userService
      .findUserBy('d8679948-57c4-4d3e-a078-0aae6aa3f73a')
      .subscribe((data: any) => {
        console.log(data);
        this.user = data;
      });
  }

  isOpenEdit = false;
  onPress() {
    this.isOpenEdit = !this.isOpenEdit;
  }

  onSaveChange() {
    // this.userService
    //   .updateUser(
    //     'd8679948-57c4-4d3e-a078-0aae6aa3f73a',
    //     'firstname' ,
    //     'lastname' ,
    //     'gender' ,
    //     'dateOfBirth'
    //   )
    //   .subscribe((data: any) => {
    //     console.log('user updated:', data);
    //     // this.user = data;
    //   });

    this.isOpenEdit = !this.isOpenEdit;
  }
}
