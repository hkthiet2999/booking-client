import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Output() onChangeTab = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
  changeTab(i: number) {
    this.onChangeTab.emit(i);
  }
}
