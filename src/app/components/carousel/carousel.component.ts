import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() data: any[];
  @Input() controls: boolean = true;
  @Input() totalE: number;
  @Input() isImages: boolean;
  selectedIndex = 0;
  indicators: boolean = true;
  constructor() {}

  ngOnInit(): void {}
  selectImages(index: number) {
    this.selectedIndex = index;
  }
  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex === this.data.length - 1;
    } else {
      this.selectedIndex--;
    }
  }
  onNextClick(): void {
    if (this.selectedIndex === this.data.length - 1) {
      this.selectedIndex === 0;
    } else {
      this.selectedIndex++;
    }
  }
}
