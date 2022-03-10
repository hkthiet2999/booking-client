import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-img-cell',
  templateUrl: './room-img-cell.component.html',
  styleUrls: ['./room-img-cell.component.scss'],
})
export class RoomImgCellComponent implements OnInit {
  @Input() imgSrc: string;
  @Input() isActive: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
