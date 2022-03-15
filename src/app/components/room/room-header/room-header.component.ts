import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RoomService } from 'app/services/room.service';

import { DialogFormComponent } from '../dialog-form/dialog-form.component';

@Component({
  selector: 'app-room-header',
  templateUrl: './room-header.component.html',
  styleUrls: ['./room-header.component.scss'],
})
export class RoomHeaderComponent implements OnInit {
  @Output() onAddNewRoom = new EventEmitter<string>();
  @Output() onSearchRoom = new EventEmitter<string>();
  constructor(
    public dialog: MatDialog,
    private roomService: RoomService,
    private location: Location
  ) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '40%',
      data: { title: 'Create new room', content: {} },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.onAddNewRoom.emit('add');
      }
    });
  }
  keyDownSearchBar(e: any): void {
    // console.log(e.target.value);
    this.onSearchRoom.emit(e.target.value);
    // this.roomService.getDataForRoomTable({ keyword: value }).subscribe();
  }
  ngOnInit(): void {}
  backToDashboard() {
    this.location.back();
  }
}
