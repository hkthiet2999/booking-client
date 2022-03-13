import { Component, OnInit } from '@angular/core';
import { IResponse, Room, RoomService } from 'app/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  objData: IResponse;
  rooms: Room[] = [];
  keyword: string;

  constructor(private roomService: RoomService) {}

  reloadTableData(e: any) {
    this.roomService.getDataForRoomTable().subscribe({
      next: (res: IResponse) => {
        this.rooms = res.data;
        this.objData = res;
        console.log(this.rooms);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  searchRoom(e: any) {
    const value = e;
    console.log(value);
    this.keyword = value;
    this.roomService.getDataForRoomTable({ keyword: value }).subscribe({
      next: (res: IResponse) => {
        this.rooms = res.data;
        this.objData = res;
        console.log(this.rooms);
        console.log(res);
      },
      error: (err) => {
        alert(err.toString());
        console.log(err);
      },
    });
  }
  

  ngOnInit(): void {
    this.getAllPaginatedRoom();
  }
  getAllPaginatedRoom() {
    this.roomService.getDataForRoomTable().subscribe({
      next: (res: IResponse) => {
        console.log(res);
        this.rooms = res.data;
        this.objData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
