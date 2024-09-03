import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CityListService } from '../city-list.service';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common"; // Убедитесь, что путь правильный

interface City {
  name: string;
  founded: string;
}

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    HttpClientModule
  ],
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cities: City[] = []; // Убедитесь, что тип совпадает с интерфейсом City

  constructor(private cityListService: CityListService) {}

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.cityListService.getCities().subscribe((data: City[]) => {
      this.cities = data;
    });
  }
}
