import { Component, OnInit } from '@angular/core';
import { CityListService } from '../city-list.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cityLists: any[] = [];
  newCityList: any = { userId: '', name: '', cities: [] };
  newCity: any = { name: '', founded: '' };

  constructor(private cityListService: CityListService) {}

  ngOnInit(): void {
    this.fetchCityLists();
  }

  fetchCityLists(): void {
    this.cityListService.getCityLists('user-id') // Замените 'user-id' на реальный userId
      .subscribe(data => this.cityLists = data);
  }

  addCity(): void {
    if (this.newCity.name && this.newCity.founded) {
      this.newCityList.cities.push({ ...this.newCity });
      this.newCity = { name: '', founded: '' }; // Сброс полей ввода
    }
  }

  submitCityList(): void {
    this.cityListService.createCityList(this.newCityList)
      .subscribe(() => {
        this.fetchCityLists();
        this.newCityList = { userId: '', name: '', cities: [] };
      });
  }

  deleteCityList(id: string): void {
    this.cityListService.deleteCityList(id)
      .subscribe(() => this.fetchCityLists());
  }
}
