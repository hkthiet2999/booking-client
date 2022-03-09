import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any;
  private domain = environment.API_URL;
  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) {}

  findUserBy(id: string) {
    return this.http.get<any>(`${this.domain}/users/${id}`);
  }

  updateUser(id: string, user: any) {
    console.log('user', user);
    return this.http.put<any>(`${this.domain}/users/${id}`, user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).pipe(
      tap( () => {
        this._snackBar.open( `Update Successfull`, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }),
      catchError( (res) => {
        // console.log('RES:', res);
        this._snackBar.open(`Update Fail! ${res.error.error.message}`, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        return throwError(res.error.error.message);
      })
    );
  }

  updateAvatar(formData: FormData, id: string) {
    return this.http.patch<any>(
      `${this.domain}/users/avatar/upload/${id}`,
      formData,
      {
        headers: new HttpHeaders()
          .set("Accept", "application/json")          
      }
    ).pipe(
      tap( () => {
        this._snackBar.open('Uploads Avatar Successfull', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }),
      catchError( (res) => {
        this._snackBar.open(`Uploads Fail: ${res.error.error.message}`, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        return throwError(res.error.error.message);
      })
    );
  }

}
