import { Component, OnInit } from '@angular/core';
import { FakeRoomService } from 'app/services/fake-room.service';

@Component({
  selector: 'app-roommenu',
  templateUrl: './roommenu.component.html',
  styleUrls: ['./roommenu.component.scss'],
})
export class RoommenuComponent implements OnInit {
  roomData: any;

  constructor(private roomService: FakeRoomService) {}

  ngOnInit(): void {
    this.roomData = this.roomService.roomList;
  }
}
