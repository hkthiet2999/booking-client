import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { User } from 'src/app/_model/user';
import { Role } from 'src/app/_model/role';

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
