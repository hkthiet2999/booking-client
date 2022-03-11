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
import { BookingConnectionService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/_model/booking.model';
import { User } from 'src/app/_model/user';
import { BookingConfirmDialog } from '../booking-confirm-dialog/booking-confirm-dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingDialogueComponent } from '../booking-dialogue/booking-dialogue.component';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
})
export class BookingListComponent implements OnInit, OnChanges {
  userId:string
  dummyArray: Booking[];
  bookingData: MatTableDataSource<Booking>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  expandedElement: Booking | null;
  displayedColumns = [
    'uuid',
    'userid',
    'roomid',
    'check_in_date',
    'check_out_date',
    'pricing',
    'action',
  ];

  constructor(
    private cdref: ChangeDetectorRef,
    private conn: BookingConnectionService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {}
  ngOnChanges() {
    this.cdref.detectChanges();
  }
  ngAfterViewInit() {   
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userId = JSON.parse(storedUser).id;
    }
    this.refreshData();
    this.bookingData = new MatTableDataSource(this.dummyArray);
    this.bookingData.paginator = this.paginator;
    this.bookingData.sort = this.sort;
    this.cdref.detectChanges();
  }
  onBookingSelected(event: Booking) {
    this.conn.setBooking(event);
  }
  onModifyActionSelected(event: Booking) {
    this.conn.setBooking(event);
    this.openDialog(event)
  }

  onDeleteActionSelected(event: Booking) {
    this.conn.setBooking(event);
    this.deleteBooking(event.uuid)
  }

  openDialog(booking:Booking){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height='80vh';
    dialogConfig.width='70vw';
    dialogConfig.data={uuid:booking.uuid,roomid:booking.roomid,check_in_date:booking.check_in_date,check_out_date:booking.check_out_date}
    const dialogref = this.dialog.open(BookingDialogueComponent ,dialogConfig);

    dialogref.afterClosed().subscribe((result) => {
      if (result[0]) {
        console.log(result)
        this.updateBooking(booking.uuid,result[1],result[2],result[3])
      }
    });
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
      this.bookingData.data = newData;
    });
  }
  updateBooking(uuid:string,roomid:string,cInDate:Date,cOutDate:Date){
    this.conn.updateBooking(uuid,roomid,cInDate,cOutDate).subscribe((data)=>{this.refreshData()})
  }
  deleteBooking(uuid:string){
    this.conn.deleteBooking(uuid).subscribe((data)=>{this.refreshData()})
  }
}
