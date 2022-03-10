import { UserInterface } from './../../../users/users.interface';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'app/users/services/user.services';
import { AdminService } from 'app/admin/services/admin.service';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  entryComponents: [UserDialogComponent]
})
export class UserDialogComponent implements OnInit {
  panelOpenState = false;

  userId!: string;
  user!: UserInterface;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.data.userId
    this.userService.findUserBy(this.userId).subscribe( (data: UserInterface) => {
      this.user = data;
    })
  }

  onConfirmDelete(userId: any){
    this.adminService.deleteUser(userId).subscribe( (data) => {
      console.log(data);
      window.location.reload()
    })
  }
}
