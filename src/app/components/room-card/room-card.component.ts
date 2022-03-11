import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
  @Input() data: any;
  @Input() e: number;
  @Input() totalE: number;
  @Input() isImages: boolean;
  roomData: any;
  selectedIndex = 0;
  indicators: boolean = true;
  constructor() {}

  ngOnInit(): void {
    console.log(this.isImages, 'isImages');
    console.log(this.data);
  }
  selectImages(index: number) {
    this.selectedIndex = index;
  }
}
