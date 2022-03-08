import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private domain = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(){
    return this.http.get<any>(`${this.domain}/users/`);
  }

  deleteUser(id: string){
    return this.http.delete<any>(`${this.domain}/users/${id}`);
  }
}
