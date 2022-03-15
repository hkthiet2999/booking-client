import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-img-cell',
  templateUrl: './room-img-cell.component.html',
  styleUrls: ['./room-img-cell.component.scss'],
})
export class RoomImgCellComponent implements OnInit {
  @Input() data: string[];
  @Input() isActive: boolean = false;
  selectedIndex = 0;
  indicators: boolean = true;
  constructor() {}
  ngOnInit(): void {}
  selectImages(index: number) {
    this.selectedIndex = index;
  }
}
