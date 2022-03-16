import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {catchError, Observable, ReplaySubject, tap, throwError } from 'rxjs';
import { Booking, BookingDTO, createBookingDTO } from '../_model/booking.model';
declare const Zone: any;

@Injectable()
export class BookingConnectionService {
  port = 3000
  rootURL=`http://localhost:${this.port}/`
  private currentBooking: ReplaySubject<Booking> = new ReplaySubject();
  headers :HttpHeaders;
  constructor(private http: HttpClient,private _snackbar :MatSnackBar) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }
  
  public get getCurrentBooking(): Observable<Booking> {
    return this.currentBooking.asObservable();
  }
  setBooking(booking: Booking) {
    this.currentBooking.next(booking);
  }

  
  fetchAllBooking(): Observable<BookingDTO[]> {
    
    return this.http.get<BookingDTO[]>(
      `${this.rootURL}booking`
    );
  }

  fetchAllRoom(): Observable<RoomDTO[]> {
   
    return this.http.get<RoomDTO[]>(`${this.rootURL}rooms`);
  }
  getRoomTimesheet(uuid: string): Observable<Date[]> {
    
    return this.http
      .get<Date[]>(
        `${this.rootURL}booking/timetable/` + uuid
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
      }),
    };
    return this.http.post<createBookingDTO>(
      `${this.rootURL}booking/`,
      object,
      httpOptions
    ).pipe(
      tap(() =>
        this._snackbar.open('Created Booking', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
      ),
      catchError((e) => {
        console.log(e);
        this._snackbar.open(`Booking creation Failed: ${e}`, 'Close', {
          duration: 4500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        return throwError(e);
      })
    );
  }

  deleteBooking(bookinguuid:string){
    
    return this.http.delete(
      `${this.rootURL}booking/${bookinguuid}`
    ).pipe(
      tap(() =>
        this._snackbar.open('Delete Successful', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
      ),
      catchError((e) => {
        console.log(e);
        this._snackbar.open(`Delete Failed: ${e}`, 'Close', {
          duration: 4500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        return throwError(e);
      })
    )
    ;
  }

  updateBooking(uuid:string,roomid:string,cInDate:Date,cOutDate:Date){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const object = {RoomID:roomid,check_in_date:cInDate,check_out_date:cOutDate}
    console.log(object)
    return this.http.patch(
      `${this.rootURL}booking/${uuid}`,
      object,
      httpOptions
    ).pipe(
      tap(() =>
        this._snackbar.open('Update Successful', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
      ),
      catchError((e) => {
        console.log(e);
        this._snackbar.open(`Update Failed: ${e}`, 'Close', {
          duration: 4500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        return throwError(e);
      })
    );
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
