import { UserInterface } from './../users.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any;
  private domain = environment.API_URL;
  constructor(private http: HttpClient) {}

  findUserBy(id: string) {
    return this.http.get<any>(`${this.domain}/users/${id}`);
  }

  // updateUser(
  //   id: string | any,
  //   firstname: any,
  //   lastname: any,
  //   gender: any,
  //   dateOfBirth: any
  // ) {
  //   const body = {
  //     firstname: firstname,
  //     lastname: lastname,
  //     gender: gender,
  //     dateOfBirth: dateOfBirth,
  //   };
  //   console.log('Bodyyyy',body);
  //   return this.http.put<any>(`${this.domain}/users/${id}`, body );
  // }

  updateUser(id: any, user: any) {
    console.log('user', user);
    return this.http.put<any>(`${this.domain}/users/${id}`, user,         {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
