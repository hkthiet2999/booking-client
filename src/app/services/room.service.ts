import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// let user = JSON.parse(JSON.stringify(localStorage.getItem('user')));
// let token = JSON.parse(user).access_token;
let headers = new HttpHeaders().set('Content-Type', 'application/json');
//   .set('Authorization', `Bearer ${token}`);
// let headers1 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
export interface Room {
  id?: string;
  codeName: string;
  size: string;
  price: number;
  images?: string[];
}
export interface IResponse {
  data: Room[];
  total: number;
  page: number;
  last_page: number;
}
export class UpdateRoom {
  codeName?: string;
  size?: string;
  price?: number;
}
export class Pagination {
  keyword?: string;
  page?: number;
  limit?: number;
}
@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}
  private url: string = 'http://localhost:3000/rooms';
  getDataForHome(): Observable<IResponse> {
    return this.http.get<IResponse>(this.url);
  }
  getRoomById(roomId: string): Observable<Room> {
    return this.http.get<Room>(`${this.url}/${roomId}`);
  }
  getDataForRoomTable(pagination?: Pagination): Observable<IResponse> {
    if (pagination) {
      if (pagination.keyword !== undefined) {
        return this.http.get<IResponse>(
          `${this.url}/pagination?keyword=${pagination.keyword}&page=${pagination.page}&limit=${pagination.limit}`
        );
      } else {
        return this.http.get<IResponse>(
          `${this.url}/pagination?page=${pagination.page}&limit=${pagination.limit}`
        );
      }
    } else {
      return this.http.get<IResponse>(`${this.url}/pagination`);
    }
  }
  createRoom(payload: Room): Observable<Room> {
    return this.http.post<Room>(this.url, payload, { headers: headers });
  }
  updateRoom(roomId: string, payload: UpdateRoom): Observable<object> {
    return this.http.put<object>(`${this.url}/${roomId}`, payload, {
      headers: headers,
    });
  }
  deleteRoom(roomId: string): Observable<object> {
    return this.http.delete<object>(`${this.url}/${roomId}`, {
      headers: headers,
    });
  }
  uploadRoomImages(roomId: string, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', file);
    console.log('khang', roomId);
    const req = new HttpRequest(
      'POST',
      `${this.url}/images/${roomId}`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }
}
