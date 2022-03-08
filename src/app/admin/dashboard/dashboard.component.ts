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

  navigate() {
    this.router.navigate(['admin/guest']);

    // this.router.navigateByUrl('#');
  }
}
