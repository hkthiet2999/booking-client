import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { BookingService } from 'src/app/services/booking.service';
import { FakeRoomService } from 'src/app/services/fake-room.service';
import { BookingConnectionService } from 'src/app/services/httpConnection.service';
import { Router } from '@angular/router';
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
    start: new FormControl(new Date(), Validators.required),
    end: new FormControl(new Date(), Validators.required),
  });

  constructor(
    private param: ActivatedRoute,
    private roomService: FakeRoomService,
    private conn: BookingConnectionService,
    private authService: AuthService,
    private cdref: ChangeDetectorRef,
    private router: Router
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
          console.log(data);
          this.response = true;
          setTimeout(() => this.router.navigate(['/']), 1000);
        })
      );
  }
}
