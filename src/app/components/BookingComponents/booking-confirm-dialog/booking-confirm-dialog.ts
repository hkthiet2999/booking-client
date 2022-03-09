import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Booking } from "src/app/_model/booking.model";




export interface DialogData {
    roomid:string
    startdate:Date;
    enddate:Date;
    pricePerDay:number;
    days:number;
    genericRoomData:any
  }

@Component({
    selector: 'app-booking-confirm-dialog',
    templateUrl: './booking-confirm-dialog.html',
    styleUrls: ['./booking-confirm-dialog.scss'],
  })

  export class BookingConfirmDialog implements OnInit{
    data:DialogData
    days:number
    constructor(@Inject(MAT_DIALOG_DATA) public indata:DialogData,public dialogRef: MatDialogRef<BookingConfirmDialog>){
        
    }
    
    ngOnInit(): void {
        
    }

    confirm(){
        this.dialogRef.close(true)
    }
    cancel(){
        this.dialogRef.close(false)
    }

  }