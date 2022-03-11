import { Component, OnInit } from '@angular/core';
import { Response, Room, RoomService } from 'src/app/services/room.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  objData: Response;
  rooms: Room[] = [];
  keyword: string;
  reloadTableData(e: any) {
    this.roomService.getDataForRoomTable().subscribe({
      next: (res: Response) => {
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
      next: (res: Response) => {
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
  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.getAllPaginatedRoom();
  }
  getAllPaginatedRoom() {
    this.roomService.getDataForRoomTable().subscribe({
      next: (res: Response) => {
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
