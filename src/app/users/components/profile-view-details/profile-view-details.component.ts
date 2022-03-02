import { Component, Input, OnInit } from '@angular/core';

interface Gender {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'profile-view-details',
  templateUrl: './profile-view-details.component.html',
  styleUrls: ['./profile-view-details.component.scss'],
})
export class ProfileViewDetailsComponent implements OnInit {
  @Input() user: any;
  selectedGender: string | undefined;
  constructor() {}

  ngOnInit(): void {}

  

  genderOptions: Gender[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  
}
