import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FakeRoomService } from 'src/app/services/fake-room.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.scss'],
})
export class BookingpageComponent implements OnInit {
  roomId: any;
  roomData: any;
  formBooking: FormGroup = new FormGroup({
    checkinDate: new FormControl(null, [Validators.required]),
    checkoutDate: new FormControl(null, [Validators.required]),
  });
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private param: ActivatedRoute,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.roomId = this.param.snapshot.paramMap.get('roomId');
    if (this.roomId) {
      this.isLoading$.next(true);
      this.roomService.getRoomById(this.roomId).subscribe({
        next: (res) => {
          this.roomData = res;
          console.log(res, 'by id');
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.isLoading$.next(false);
        },
      });
    }
  }
}
