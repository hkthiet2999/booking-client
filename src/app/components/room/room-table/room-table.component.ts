import {
  Component,
  ViewChild,
  OnInit,
  Input,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  IResponse,
  Pagination,
  Room,
  RoomService,
} from 'app/services/room.service';
import { BehaviorSubject } from 'rxjs';

import { DialogFormComponent } from '../dialog-form/dialog-form.component';
@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.scss'],
})
export class RoomTableComponent implements OnInit {
  @Input() rooms: Room[] = [];
  @Input() keyword: string;
  @Input() objData: IResponse;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  nextPage: boolean = false;
  displayedColumns: string[] = [
    'no',
    'roomName',
    'size',
    'price',
    'images',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<Room>(this.rooms);
  initialized = false;

  constructor(public dialog: MatDialog, private roomService: RoomService) {
    this.roomService.getDataForRoomTable().subscribe({
      next: (res: IResponse) => {
        console.log(res, 'res');
        this.rooms = res.data;
        this.objData = res;
        // this.dataSource = new MatTableDataSource<Room>(this.objData.data);
        // this.paginator!.length = this.objData.total;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading$.next(false);
      },
    });
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    // console.log(this.objData, 'trong table');
    // console.log(this.paginator, 'table');
    // this.objData.total;
    this.initialized = true;
  }
  ngAfterViewInit() {
    console.log(this.paginator, 'viewInit');
    if (this.objData?.total) {
      this.paginator.length = this.objData.total;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.keyword, 'keyword ne');
    console.log(this.rooms, this.objData, 'onchange');
    console.log(this.paginator, 'table onchange');
    if (this.initialized) {
      this.dataSource = new MatTableDataSource<Room>(this.objData.data);
      this.paginator.length = this.objData.total;
      this.paginator.pageIndex = 0;
    }
  }
  getAllPaginatedRoom(pagination?: Pagination) {
    this.isLoading$.next(true);
    this.roomService.getDataForRoomTable(pagination).subscribe({
      next: (res: IResponse) => {
        console.log(res, 'res');
        this.rooms = res.data;
        this.objData = res;
        this.dataSource = new MatTableDataSource<Room>(this.objData.data);
        this.paginator.length = this.objData.total;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading$.next(false);
      },
    });
  }
  editRoom(e: Room): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '40%',
      data: {
        title: 'Edit room',
        type: 'update',
        content: e,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        let page = this.paginator.pageIndex + 1;
        let limit = this.paginator.pageSize;
        this.getAllPaginatedRoom({ page: page, limit: limit });
      }
    });
  }
  deleteRoom(roomId: string) {
    console.log(roomId);
    this.roomService.deleteRoom(roomId).subscribe({
      next: (res) => {
        console.log(res);
        let page = this.paginator.pageIndex + 1;
        let limit = this.paginator.pageSize;
        this.getAllPaginatedRoom({ page: page, limit: limit });
      },
      error: (err) => {
        alert(err.toString());
        console.log(err);
      },
    });
  }
  reloadTable(e: any) {
    console.log(this.paginator.pageIndex, 'paginator index change');
    console.log(this.paginator.pageSize, 'paginator index change');
    const pagination: Pagination = {
      keyword: this.keyword,
      page: this.paginator.pageIndex + 1,
      limit: this.paginator.pageSize,
    };
    this.getAllPaginatedRoom(pagination);
  }
}
