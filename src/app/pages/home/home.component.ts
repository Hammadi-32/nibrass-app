import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  sampleSchools = [
    {
      name: 'مدرسة الأمل',
      location: 'إدلب - معرة مصرين',
      needs: ['6 نوافذ', '4 أبواب', '15 طاولة'],
      image: 'assets/school1.jpeg'
    },
    {
      name: 'مدرسة النور',
      location: 'ريف دمشق - حرستا',
      needs: ['10 مقاعد', 'سبورة', 'بلاط'],
      image: 'assets/school2.jpg'
    }
  ];
}
