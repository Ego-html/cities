import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface City {
  name: string;
  founded: string; // Поле для даты основания
}

@Injectable({
  providedIn: 'root'
})
export class CityListService {
  private apiUrl = 'http://localhost:3000/api/cities'; // Базовый URL для API

  constructor(private http: HttpClient) {}

  // Получение всех городов
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl)
      .pipe(catchError(this.handleError<City[]>('getCities', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
