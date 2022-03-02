import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../users.interface';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss']
})
export class ProfileMainComponent implements OnInit {

  user!: UserInterface;

  constructor() {}

  ngOnInit() {
    this.user = {
      id: '51702187-aaa',
      email: 'harry.hoang@contemi.com',
      firstname: 'Harry',
      lastname: 'Hoang',
      gender: 'male',
      dateOfBirth: '',
      avatarUrl: '',
      role: 'user',
    };
  }

  isOpenEdit = false;
  onPress() {
    //this.display = true;

    //To toggle the component
    this.isOpenEdit = !this.isOpenEdit;
  }

}
