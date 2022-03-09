import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { FakeRoomService } from 'src/app/services/fake-room.service';
import { BookingConnectionService } from 'src/app/services/httpConnection.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookingConfirmDialog } from '../BookingComponents/booking-confirm-dialog/booking-confirm-dialog';
@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.scss'],
})
export class BookingpageComponent implements OnInit {
  roomId: any;
  roomData: any;
  userId: any;
  response: boolean = false;
  SelectedRoomTimesheet: Data[] = [];
  dateRange = new FormGroup({
    start: new FormControl('',Validators.required),
    end: new FormControl('',Validators.required),
  });

  constructor(
    private param: ActivatedRoute,
    private roomService: FakeRoomService,
    private conn: BookingConnectionService,
    private cdref: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userId = JSON.parse(storedUser).id;
    }
    this.roomId = this.param.snapshot.paramMap.get('roomId');
    if (this.roomId) {
      this.roomData = this.roomService.roomList.filter((value) => {
        return value.id === this.roomId;
      });
      this.conn.getRoomTimesheet(this.roomId).subscribe((data) => {
        this.SelectedRoomTimesheet = data;
      });
    }
    this.cdref.detectChanges();
  }

  filter = (date: Date): boolean => {
    let res = [];
    console.log(this.SelectedRoomTimesheet);
    for (let i = 0; i < this.SelectedRoomTimesheet.length; i += 2) {
      res.push(
        this.inRange(
          date,
          this.SelectedRoomTimesheet[i],
          this.SelectedRoomTimesheet[i + 1]
        )
      );
    }
    return !res.includes(true);
  };

  inRange(val: Date, start: any, end: any) {
    console.log(val);
    start = new Date(start);
    end = new Date(end);
    if (
      (val.getTime() - start.getTime()) * (val.getTime() - end.getTime()) <=
      0
    ) {
      return true;
    }
    if (val.getDate == start.getDate() || val.getDate == end.getDate()) {
      return true;
    }
    return false;
  }

  openDialog(){
    
    const days=(this.dateRange.value.end -this.dateRange.value.start)/(1000 * 60 * 60 * 24)
    const dialogRef = this.dialog.open(BookingConfirmDialog, {
      width: '750px',
      data: {
             startdate:this.dateRange.value.start,
             enddate:this.dateRange.value.end,
             roomid:this.roomId,
             pricePerDay:this.roomData[0].price,
             days:days,
             genericRoomData:this.roomData[0]}
    });

    dialogRef.afterClosed().subscribe(result=>{if(result){
      this.submitBooking()
    }})
  }

  submitBooking() {
    this.conn
      .createBooking(
        this.userId,
        this.roomId,
        this.dateRange.value.start,
        this.dateRange.value.end
      )
      .subscribe((data) =>
        this.conn.getRoomTimesheet(this.roomId).subscribe((data) => {
          this.response = true;
          setTimeout(() => this.router.navigate(['/']), 2000);
        })
      );
  }
}
