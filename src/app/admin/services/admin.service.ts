import { catchError, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';

interface CreateUserI{
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private domain = environment.API_URL;
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  getAllUsers(){
    return this.http.get<any>(`${this.domain}/users/`);
  }

  deleteUser(id: string){
    return this.http.delete<any>(`${this.domain}/users/${id}`).pipe(
      tap( () => {
        this._snackBar.open(`Delete User Successful`, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }),
      catchError( (res) => {
        this._snackBar.open(`Delete user fail: ${res}`, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        return throwError(res)
      } )
    );
  }

  createUser(body: any){
    console.log('Body in form create user:', body);
    return this.http.post<any>(`${this.domain}/users/`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).pipe(
      tap( () => {
        this._snackBar.open(`Create User Successful`, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }),
      catchError( (res) => {
        this._snackBar.open(`Create user fail: ${res}`, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        return throwError(res)
      } )
    )

  }
}

