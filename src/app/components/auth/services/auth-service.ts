import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap, throwError } from 'rxjs';
import { IUser } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  login(user: IUser) {
    const { email, password } = user;
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((res: any) => localStorage.setItem('token', res.access_token)),
      tap(() =>
        this.snackbar.open('Login Successfull', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
      ),
      catchError((e) => {
        console.log(e)
        this.snackbar.open(
          `Login error: ${e.error.message}`,
          'Close',
          {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
        return throwError(e);
      })
    );
  }

  register(user: IUser) {
    return this.http.post<IUser>(`${this.apiUrl}/auth/register`, user).pipe(
      tap((registeredUser: IUser) =>
        this.snackbar.open(
          `User ${registeredUser.email} registered successfully`,
          'Close',
          {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        )
      ),
      catchError((e) => {
        this.snackbar.open(
          `User could not be registered, error: ${e.error.message}`,
          'Close',
          {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
        return throwError(e);
      })
    );
  }

  getLoggedInUser() {
    // const decodedToken = this.jwtService.decodeToken();
    // return decodedToken.user;
  }
}
