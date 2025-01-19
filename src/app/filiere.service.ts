import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {
  private apiUrl = 'http://localhost:8000/api/filieres/';

  constructor(private http: HttpClient ) {}


  getFilieres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  addFiliere(filiere: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, filiere);
  }


  updateFiliere(id: number, filiere: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, filiere);
  }


  deleteFiliere(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
