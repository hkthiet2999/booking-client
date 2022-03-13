import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
   
  constructor(private router: Router,
    ) {
    
  }

  ngOnInit(): void {}

  navigateToUserManagement() {
    this.router.navigate(['admin/user-management']);

    // this.router.navigateByUrl('#');
  }

  navigateToRoomManagement() {
    this.router.navigate(['admin/room-management']);

    // this.router.navigateByUrl('#');
  }

  navigateToBookingManagement() {
    this.router.navigate(['admin/booking-management']);

    // this.router.navigateByUrl('#');
  }
}
