import { Component, Input, OnInit } from '@angular/core';
import { BookingConnectionService } from 'app/services/booking.service';
import { Booking } from 'app/_model/booking.model';


@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss'],
})
export class BookingDetailComponent implements OnInit {
  @Input() bookingDetails: Booking;
  constructor(private bookingService: BookingConnectionService) {}

  ngOnInit(): void {
    this.bookingService.getCurrentBooking.subscribe((bookingData) => {
      this.bookingDetails = bookingData;
    });
  }
}
