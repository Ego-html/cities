import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface City {
  name: string;
  founded: string; // Добавляем поле для даты основания
}

interface CityList {
  userId: string;
  name: string;
  cities: City[];
}

@Injectable({
  providedIn: 'root'
})
export class CityListService {
  private apiUrl = 'http://localhost:3000/api/city-lists';

  constructor() {}

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return of(); // Возвращаем пустой Observable в случае ошибки
  }

  // Создание списка городов
  createCityList(cityList: CityList): Observable<CityList> {
    return from(fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cityList)
    }).then(response => response.json()))
      .pipe(
        catchError(this.handleError)
      );
  }

  // Получение списка городов по userId
  getCityLists(userId: string): Observable<CityList[]> {
    return from(fetch(`${this.apiUrl}?userId=${userId}`)
      .then(response => response.json()))
      .pipe(
        catchError(this.handleError)
      );
  }

  // Обновление списка городов по id
  updateCityList(id: string, cityList: Partial<CityList>): Observable<CityList> {
    return from(fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cityList)
    }).then(response => response.json()))
      .pipe(
        catchError(this.handleError)
      );
  }

  // Удаление списка городов по id
  deleteCityList(id: string): Observable<void> {
    return from(fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    }).then(() => {}))
      .pipe(
        catchError(this.handleError)
      );
  }
}
