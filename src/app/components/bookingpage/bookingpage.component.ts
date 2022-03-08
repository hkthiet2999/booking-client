import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FakeRoomService } from 'src/app/services/fake-room.service';

@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.scss']
})
export class BookingpageComponent implements OnInit {
  roomId: any;
  roomData: any;
  formBooking: FormGroup = new FormGroup({
    checkinDate: new FormControl(null, [Validators.required]),
    checkoutDate: new FormControl(null, [Validators.required]),
    
  })

  constructor(
    private param: ActivatedRoute,
    private roomService: FakeRoomService,
  ) { }

  ngOnInit(): void {
    this.roomId = this.param.snapshot.paramMap.get('roomId');
    if (this.roomId) {
      this.roomData = this.roomService.roomList.filter((value) => {
        return value.id === this.roomId
      })
    }
  }

}
