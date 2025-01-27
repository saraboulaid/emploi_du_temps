import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

private baseUrl = 'http://localhost:8000/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  getCategorieById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addCategorie(categorie: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, categorie);
  }

  updateCategorie(id: number, categorie: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/update`, categorie);
  }

  deleteCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/delete`);
  }
}
