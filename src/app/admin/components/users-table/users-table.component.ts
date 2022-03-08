import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'app/admin/services/admin.service';
import { UserInterface } from 'app/users/users.interface';
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

      const users = Array.from({ length: this.usersAPI.length }, (_, k) =>
        createOneUser(k, this.usersAPI)
      );

      this.dataSource = new MatTableDataSource(users);
      // console.log('Data source: ', this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // ngAfterViewInit() {
  //   // console.log('Co dataSource:', this.dataSource);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickUserDetails(userId: string) {
    console.log(userId);

    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { userId: userId },
      height: '35vw',
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    // dialogRef.afterClosed().subscribe(result => {
    // });

    //   const dialogSubmitSubscription =
    //   dialogRef.componentInstance.submitClicked.subscribe(result => {
    //   dialogSubmitSubscription.unsubscribe();
    // });
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
      : 'https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg',
    gender: usersAPI[id].gender,
    birthday: usersAPI[id].dateOfBirth,
  };
}
