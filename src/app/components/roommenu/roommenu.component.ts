import { Component, OnInit } from '@angular/core';
import { RoomService } from 'app/services/room.service';

@Component({
  selector: 'app-roommenu',
  templateUrl: './roommenu.component.html',
  styleUrls: ['./roommenu.component.scss'],
})
export class RoommenuComponent implements OnInit {
  roomData: any;
  selectedIndex = 0;
  indicators: boolean = true;
  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getDataForHome().subscribe({
      next: (res) => {
        console.log(res, 'menu');
        this.roomData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  selectImages(index: number) {
    this.selectedIndex = index;
  }
}
