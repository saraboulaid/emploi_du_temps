import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DurationService {
  private baseUrl = 'http://localhost:8000/api/durations';

  constructor(private http: HttpClient) {}

  getDurations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  getDurationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addDuration(duration: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, duration);
  }

  updateDuration(id: number, duration: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/update`, duration);
  }

  deleteDuration(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/delete`);
  }
}
