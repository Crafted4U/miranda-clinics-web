import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QueueResponse {
  room1: {
    room: string;
    doctor: string;
    number: string;
  };
  room2: {
    room: string;
    doctor: string;
    number: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private api = 'https://mc-api.solcredio.net/api';

  constructor(private http: HttpClient) {}

  getQueue(): Observable<QueueResponse> {
    return this.http.get<QueueResponse>(`${this.api}/queue`);
  }

  updateRoom(room: string, number: number) {
    return this.http.put(`${this.api}/queue/${room}`, {
      number
    });
  }
}