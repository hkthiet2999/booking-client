import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BookingDTO, createBookingDTO } from "../_model/booking.model";
;










@Injectable()
export class BookingConnectionService{
    constructor(private http: HttpClient){}
    currentToken="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNjc0Nzk1Yy1hMThiLTQxNDUtYjkwZS0zMTZmZmYxYzRlYmMiLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ2Nzk2ODkzLCJleHAiOjE2NDY4ODMyOTN9.s7KRfG3vtqPgkDnMZEaVAMDUcnjrA2zc8dyiHQ0ixEQ"
    fetchAllBooking():Observable<BookingDTO[]>{
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization':`${this.currentToken}`
            })
          };
          console.log("fetch Bookings flared")
        return this.http.get<BookingDTO[]>("http://localhost:3000/booking",httpOptions);
    }

    //====================== NOTE: BELOW HERE ARE HTTP SCRIPTS CREATED TO RETRIEVE DATA FROM DATABASE FOR TESTING ONLY ==================
    


    fetchAllRoom():Observable<RoomDTO[]>{
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization':`${this.currentToken}`
          })
        };
        console.log("fetch Rooms flared")
      return this.http.get<RoomDTO[]>("http://localhost:3000/rooms",httpOptions);
  }
    getRoomTimesheet(uuid:string):Observable<Date[]>{
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization':`${this.currentToken}`
          })
        };
        console.log("fetch Timesheet flared for room "+uuid)
      return this.http.get<Date[]>("http://localhost:3000/booking/timetable/"+uuid,httpOptions);
    }
    createBooking(userid:string,roomid:string,cindate:Date,coutdate:Date):Observable<createBookingDTO>{
      
      const object:createBookingDTO={
        user_id: userid,
        room_id: roomid,
        check_in_date: cindate,
        check_out_date: coutdate
      } 
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization':`${this.currentToken}`
          })
        };
        console.log("create booking flared ")
      
        return   this.http.post<createBookingDTO>("http://localhost:3000/booking/",object,httpOptions);
  }    
    
}

export class RoomDTO{
  public id:string;
  public codeName:string;
  public size:RoomSize;
  public price:string;
  public image:string;
  public isVacant:boolean; 
}
export enum RoomSize {
  SINGLE = 'single',
  DOUBLE = 'double',
  DORMITORY = 'dormitory',
}
export class Room{
  public uuid:string;
  public codeName:string;
  public size:RoomSize;
  public price:string;
  public image:string;
  public isVacant:boolean; 

  constructor(dto:RoomDTO){
      this.uuid=dto.id;
      this.codeName=dto.codeName;
      this.size=dto.size;
      this.price=dto.price;
      this.image=dto.image;
      this.isVacant=dto.isVacant;
  }
}