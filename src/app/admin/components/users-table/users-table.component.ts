import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'app/admin/services/admin.service';
import { UserInterface } from 'app/users/users.interface';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = [
    'no',
    'avatar',
    'email',
    'fullname',
    'gender',
    'birthday',
  ];
  dataSource!: MatTableDataSource<UserInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  usersAPI: any;
  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit() {
    this.adminService.getAllUsers().subscribe(async (data: any) => {
      console.log(data);
      this.usersAPI = data;

      let users = Array.from({ length: this.usersAPI.length }, (_, k) =>
        createOneUser(k, this.usersAPI)
      );

      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickUserDetails(userId: string) {
    console.log(userId);

    const dialogRefUserDetails = this.dialog.open(UserDialogComponent, {
      data: { userId: userId },
      height: '35vw',
      width: '60vw',
    });

    dialogRefUserDetails.componentInstance.onSave.subscribe((data) => {
      console.log('Data emitted:', data);
      let users = Array.from({ length: data.length }, (_, k) =>
        createOneUser(k, data)
      );
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onClickCreateUser() {
    const dialogRefCreateUser = this.dialog.open(CreateUserComponent, {
      height: '35vw',
      width: '60vw',
    });

    dialogRefCreateUser.componentInstance.onSave.subscribe((data) => {
      console.log('Data emitted:', data);
      let users = Array.from({ length: data.length }, (_, k) =>
        createOneUser(k, data)
      );
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }
}

function createOneUser(id: number, usersAPI: any): UserInterface {
  let index = id + 1;
  let fullname = usersAPI[id].firstname + ' ' + usersAPI[id].lastname;
  return {
    userId: usersAPI[id].id,
    index: index.toString(),
    email: usersAPI[id].email,
    fullname: fullname,
    avatar: usersAPI[id].avatarUrl
      ? usersAPI[id].avatarUrl
      : 'assets/images/user-null-avatar.png',
    gender: usersAPI[id].gender,
    birthday: usersAPI[id].dateOfBirth,
  };
}
