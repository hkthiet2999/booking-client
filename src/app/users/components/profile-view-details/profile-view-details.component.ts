import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'profile-view-details',
  templateUrl: './profile-view-details.component.html',
  styleUrls: ['./profile-view-details.component.scss'],
})
export class ProfileViewDetailsComponent implements OnInit {
  @Input() user: any;
  constructor() {}

  ngOnInit(): void {}


  
}
