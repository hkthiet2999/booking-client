import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingConnectionService, Room } from 'app/services/booking.service';
import { FakeRoomService } from 'app/services/fake-room.service';
export interface BookingIndata{
  uuid:string;
  roomid:string;
  check_in_date:Date;
  check_out_date:Date
}



@Component({
  selector: 'app-booking-dialogue',
  templateUrl: './booking-dialogue.component.html',
  styleUrls: ['./booking-dialogue.component.scss']
})
export class BookingDialogueComponent implements OnInit {
  SelectedRoom:Room;
  SelectedRoomTimesheet:Date[]=[];
  filteredRoomArray:Room[]=[]
  dateRange: FormGroup;
  userId:string
  
  constructor(private conn:BookingConnectionService,
              private cdref: ChangeDetectorRef,
              private roomservice:FakeRoomService ,  
              @Inject(MAT_DIALOG_DATA) public indata: BookingIndata,
              public dialogRef: MatDialogRef<BookingDialogueComponent>){
    this.dateRange = new FormGroup({
      start: new FormControl(new Date(indata.check_in_date), Validators.required),
      end: new FormControl(new Date(indata.check_out_date), Validators.required),
    });
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userId = JSON.parse(storedUser).id;
    }
  }
  ngAfterViewInit(){
    this.loadRooms()
    this.cdref.detectChanges()
  }

 filter = (date: Date): boolean => {
  let res = [];
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
 inRange(val:Date, start:any, end:any) {
  console.log(val)
  start = new Date(start)
  end = new Date(end)
  if ((val.getTime()-start.getTime())*(val.getTime()-end.getTime())<= 0){
    return true
  }
  if (val.getDate==start.getDate() || val.getDate==end.getDate()){
    return true
  }
  return false
  }

  loadRooms(){
    this.conn.fetchAllRoom().subscribe((inData) =>{
      let newData=[]
      for (const entry of inData){
          newData.push(new Room(entry))
      }
      this.filteredRoomArray=newData   
    })
  }

  selectRoom(room:Room){
      this.SelectedRoom=room
      this.conn.getRoomTimesheet(this.SelectedRoom.uuid).subscribe(
        (data)=>{
          this.SelectedRoomTimesheet=data;
      })
  }

  submitBooking(){
    this.conn.updateBooking(this.indata.uuid,this.SelectedRoom.uuid,this.dateRange.value.start,this.dateRange.value.end).subscribe((data)=>this.dialogRef.close(true))
  }
}
