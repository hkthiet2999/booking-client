import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { User } from 'src/app/_model/user';
import { environment } from 'src/environments/environment';
import { IUser } from '../components/auth/user.interface';
const port = 3029
const rootURL=`localhost:${port}`
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User>(<User>{
    id: '',
    role: null,
    access_token: '',
  });
  get user(): Observable<User> {
    return this.userSubject.asObservable();
  }
  get userValue(): User {
    return this.userSubject.getValue();
  }

  private BASE_URL = environment.API_URL;

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) {}

  login(email: string, password: string) {
    return this.http
      .post<User>(`${this.BASE_URL}/auth/login`, { email, password })
      .pipe(
        // tap((res: any) => localStorage.setItem('token', res.access_token)),
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(user);
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        }),
        tap(() =>
          this.snackbar.open('Login Successfull', 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
        ),
        catchError((e) => {
          console.log(e);
          this.snackbar.open(`Login error: ${e}`, 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          return throwError(e);
        })
      );
  }

  register(user: IUser) {
    return this.http.post<IUser>(`${this.BASE_URL}/auth/register`, user).pipe(
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

  logout() {
    return this.http.post(`${this.BASE_URL}/auth/logout`, {}).subscribe(() => {
      const emptyUser = new User('', null, '');
      localStorage.removeItem('user');
      // this.userSubject.next(null);
      this.userSubject.next(emptyUser);
      this.router.navigate(['/']);
    });
  }
}
