import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
  tabIndex = 0;
  constructor() {}

  ngOnInit() {}
  changeTab(e: any) {
    this.tabIndex = e;
    console.log(e, 'tab');
  }
}
