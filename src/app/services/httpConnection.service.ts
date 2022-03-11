import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, isObservable, map, Observable } from 'rxjs';
import { BookingDTO, createBookingDTO } from '../_model/booking.model';
declare const Zone: any;

@Injectable()
export class BookingConnectionService {
  constructor(private http: HttpClient) {}
   port = 3000
   rootURL=`http://localhost:${this.port}/`
  currentToken ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYTFjNDU3ZC1lZGE1LTRmMWEtODM3MS1hOThjOWYxMzdhZWMiLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ2OTA0OTE5LCJleHAiOjE2NDY5OTEzMTl9.N-HF8MOZS1ILYE4OaQR0iuB1lTvBYVNSJiAPjEvAjrA"
  fetchAllBooking(): Observable<BookingDTO[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${this.currentToken}`,
      }),
    };
    return this.http.get<BookingDTO[]>(
      `${this.rootURL}booking`,
      httpOptions
    );
  }

  //====================== NOTE: BELOW HERE ARE HTTP SCRIPTS CREATED TO RETRIEVE DATA FROM DATABASE FOR TESTING ONLY ==================

  fetchAllRoom(): Observable<RoomDTO[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${this.currentToken}`,
      }),
    };
    return this.http.get<RoomDTO[]>(`${this.rootURL}rooms`, httpOptions);
  }
  getRoomTimesheet(uuid: string): Observable<Date[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${this.currentToken}`,
      }),
    };
    return this.http
      .get<Date[]>(
        `${this.rootURL}booking/timetable/` + uuid,
        httpOptions
      )
      .pipe((value) => {
        return value;
      });
  }
  createBooking(
    userid: string,
    roomid: string,
    cindate: Date,
    coutdate: Date
  ): Observable<createBookingDTO> {
    const object: createBookingDTO = {
      user_id: userid,
      room_id: roomid,
      check_in_date: cindate,
      check_out_date: coutdate,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${this.currentToken}`,
      }),
    };
    return this.http.post<createBookingDTO>(
      `${this.rootURL}booking/`,
      object,
      httpOptions
    );
  }

  deleteBooking(bookinguuid:string){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.currentToken}`,
      }),
    };
    return this.http.delete(
      `${this.rootURL}booking/${bookinguuid}`,
      httpOptions
    )
    ;
  }

  updateBooking(uuid:string,roomid:string,cInDate:Date,cOutDate:Date){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `${this.currentToken}`,
        'Content-Type': 'application/json',
      }),
    };
    const object = {RoomID:roomid,check_in_date:cInDate,check_out_date:cOutDate}
    console.log(object)
    return this.http.patch(
      `${this.rootURL}booking/${uuid}`,
      object,
      httpOptions
    )
  }


  
}

export class RoomDTO {
  public id: string;
  public codeName: string;
  public size: RoomSize;
  public price: string;
  public image: string;
  public isVacant: boolean;
}
export enum RoomSize {
  SINGLE = 'single',
  DOUBLE = 'double',
  DORMITORY = 'dormitory',
}
export class Room {
  public uuid: string;
  public codeName: string;
  public size: RoomSize;
  public price: string;
  public image: string;
  public isVacant: boolean;

  constructor(dto: RoomDTO) {
    this.uuid = dto.id;
    this.codeName = dto.codeName;
    this.size = dto.size;
    this.price = dto.price;
    this.image = dto.image;
    this.isVacant = dto.isVacant;
  }
}
