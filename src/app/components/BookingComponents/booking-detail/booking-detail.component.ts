import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/_model/booking.model';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  @Input() bookingDetails:Booking 
  constructor(private bookingService:BookingService) { }

  ngOnInit(): void {
    this.bookingService.getCurrentBooking.subscribe(
      bookingData => {this.bookingDetails=bookingData; }
    )
  }
  
  
}
