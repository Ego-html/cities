import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CityListComponent } from './city-list/city-list.component';
import { CityListService } from './city-list.service'; // Убедитесь, что путь правильный

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CityListComponent
  ],
  providers: [
    CityListService // Убедитесь, что сервис предоставлен
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'city-manager-frontend';
}
