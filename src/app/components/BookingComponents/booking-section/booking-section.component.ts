import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-section',
  templateUrl: './booking-section.component.html',
  styleUrls: ['./booking-section.component.scss'],
})
export class BookingSectionComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  backToDashboard(){
    this.location.back()
  }
}
