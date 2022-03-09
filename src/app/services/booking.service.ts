import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  of,
  ReplaySubject,
  isObservable,
  firstValueFrom,
} from 'rxjs';
import { Booking } from '../_model/booking.model';

import { take } from 'rxjs/operators';

declare const Zone: any;

@Injectable()
export class BookingService {
  private currentBooking: ReplaySubject<Booking> = new ReplaySubject();
  private toggledOffFromList: ReplaySubject<boolean> = new ReplaySubject();

  public get getCurrentBooking(): Observable<Booking> {
    return this.currentBooking.asObservable();
  }
  setBooking(booking: Booking) {
    this.currentBooking.next(booking);
  }
  public get toggleSidebarFromList(): Observable<Boolean> {
    return this.toggledOffFromList.asObservable();
  }
  toggleOffSidebar() {
    this.toggledOffFromList.next(false);
  }

  async waitFor<T>(prom: Promise<T> | Observable<T>): Promise<T> {
    if (isObservable(prom)) {
      prom = firstValueFrom(prom);
    }
    const macroTask = Zone.current.scheduleMacroTask(
      `WAITFOR-${Math.random()}`,
      () => {},
      {},
      () => {}
    );
    return prom.then((p: T) => {
      macroTask.invoke();
      return p;
    });
  }
}
