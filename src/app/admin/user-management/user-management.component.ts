import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CreateUserComponent } from '../components/create-user/create-user.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

}
