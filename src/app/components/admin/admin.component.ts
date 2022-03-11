import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth-service';
import { Role } from 'app/users/users.interface';
import { User } from 'app/_model/user';


@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
  isAdmin: boolean;
  user: User;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = false;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isAdmin = this.user.role === Role.Admin;
    }
  }
}
