import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  BookingConnectionService,
  Room,
  RoomSize,
} from 'src/app/services/httpConnection.service';

@Component({
  selector: 'app-booking-dialogue',
  templateUrl: './booking-dialogue.component.html',
  styleUrls: ['./booking-dialogue.component.scss'],
})
export class BookingDialogueComponent implements OnInit {
  SelectedSize: string;
  SelectedRoom: Room;
  SelectedRoomTimesheet: Date[] = [];
  RoomSizeArray: string[];
  originalRoomArray: Room[];
  filteredRoomArray: Room[];
  isLinear: Boolean = true;
  userid: string = '57d2ec7a-2f49-4308-8f37-5a0a81a39bee';

  dateRange: FormGroup;

  getRoomSizes() {
    const keys = Object.keys(RoomSize);
    return keys;
  }
  resetBooking() {
    this.SelectedSize = '';
    this.SelectedRoom = <Room>{};
    this.SelectedRoomTimesheet = [];
  }
  constructor(
    private conn: BookingConnectionService,
    private cdref: ChangeDetectorRef,
    private _formBuilder: FormBuilder
  ) {
    this.dateRange = new FormGroup({
      start: new FormControl(new Date()),
      end: new FormControl(new Date()),
    });
  }

  ngOnInit() {}
  ngAfterViewInit() {
    this.loadRooms();
    this.RoomSizeArray = this.getRoomSizes();
    this.cdref.detectChanges();
  }
  filter = (d: Date): boolean => {
    let res = [];
    for (let i = 0; i < this.SelectedRoomTimesheet.length; i += 2) {
      res.push(
        this.inRange(
          d,
          this.SelectedRoomTimesheet[i],
          this.SelectedRoomTimesheet[i + 1]
        )
      );
    }
    return !res.includes(true);
  };

  loadRooms() {
    this.conn.fetchAllRoom().subscribe((inData) => {
      let newData = [];
      for (const entry of inData) {
        newData.push(new Room(entry));
      }
      this.originalRoomArray = newData;
    });
  }

  selectSize(size: string) {
    this.SelectedSize = size.toLocaleLowerCase(); // too naiive, maybe there is another way, access
    this.filteredRoomArray = this.originalRoomArray
      .slice()
      .filter((element) => element.size == this.SelectedSize);
    this.SelectedRoomTimesheet = [];
  }

  selectRoom(room: Room) {
    this.SelectedRoom = room;
    this.conn.getRoomTimesheet(this.SelectedRoom.uuid).subscribe((data) => {
      this.SelectedRoomTimesheet = data;
    });
  }

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
  confirmDate(event: Event) {
    console.log(this.dateRange.value.start, this.dateRange.value.end);
  }

  submitBooking() {
    this.conn
      .createBooking(
        this.userid,
        this.SelectedRoom.uuid,
        this.dateRange.value.start,
        this.dateRange.value.end
      )
      .subscribe((data) => console.log(data));
  }
}
