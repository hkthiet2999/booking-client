import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { BookingConnectionService } from 'src/app/services/httpConnection.service';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/_model/booking.model';
import { User } from 'src/app/_model/user';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
})
export class BookingListComponent implements OnInit, OnChanges {
  dummyArray: Booking[];
  bookingData: MatTableDataSource<Booking>;
  @Input() user: User;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  expandedElement: Booking | null;
  displayedColumns = [
    'bookingid',
    'userid',
    'roomid',
    'check_in_date',
    'check_out_date',
    'action',
  ];

  constructor(
    private bookingService: BookingService,
    private cdref: ChangeDetectorRef,
    private conn: BookingConnectionService
  ) {}
  ngOnInit(): void {}
  ngOnChanges() {
    this.cdref.detectChanges();
  }
  ngAfterViewInit() {
    this.refreshData();
    this.bookingData = new MatTableDataSource(this.dummyArray);
    this.bookingData.paginator = this.paginator;
    this.bookingData.sort = this.sort;
    this.cdref.detectChanges();
  }
  onBookingSelected(event: Booking) {
    this.bookingService.setBooking(event);
  }
  onModifyActionSelected(event: Booking) {
    this.bookingService.setBooking(event);
    console.log('modify chosen, not implemented');
  }

  onDeleteActionSelected(event: Booking) {
    this.bookingService.setBooking(event);
    console.log('delete chosen, not implemented');
  }

  onActionSelected(event: Booking) {
    this.bookingService.setBooking(event);
  }

  sortData(event: Sort) {
    const modData = this.bookingData.data.slice();
    if (!event.active || event.direction === '') {
      return;
    }
    let l1 = modData.sort((a, b) => {
      switch (event.active) {
        case 'cInDate':
          return this.compareDate(a.check_in_date, b.check_in_date);
        case 'cOutDate':
          return this.compareDate(a.created_date, b.created_date);
        case 'CreateDate':
          return this.compareDate(a.created_date, b.created_date);
        default:
          return 0;
      }
    });
    if (event.direction === 'asc') {
      this.bookingData.data = l1;
    } else this.bookingData.data = l1.reverse();
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  compareDate(a: any, b: any) {
    return Date.parse(a) < Date.parse(b) ? -1 : 1;
  }

  refreshData() {
    this.conn.fetchAllBooking().subscribe((inData) => {
      let newData = [];
      for (const entry of inData) {
        newData.push(new Booking(entry));
      }
      newData = newData.sort(() => Math.random() - 0.5);
      this.bookingData.data = newData;
    });
  }
}
