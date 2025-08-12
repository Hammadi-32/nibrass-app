import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router){}

  sampleSchools = [
    {
      name: 'مدرسة الأمل',
      province: 'إدلب',
      city: 'معرة مصرين',
      needs: ['6 نوافذ', '4 أبواب', '15 طاولة'],
      image: 'assets/school1.jpeg'
    },
    {
      name: 'مدرسة النور',
      province: 'ريف دمشق',
      city: 'حرستا',
      needs: ['10 مقاعد', 'سبورة', 'بلاط'],
      image: 'assets/school2.jpg'
    }
  ];

  redirctToSchools(){
    this.router.navigateByUrl('/schools')
  }
}
