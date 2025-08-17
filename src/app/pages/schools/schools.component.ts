import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface School {
  name: string;
  province: string;
  city: string;
  needs: string[];
  image: string;
}

@Component({
  selector: 'app-schools',
  imports: [CommonModule, FormsModule],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.scss'
})

export class SchoolsComponent implements OnInit {
  
  schoolsData = [
  {
    name: 'مدرسة الأمل',
    province: 'إدلب',
    city: 'معرة مصرين',
    needs: ['6 نوافذ', '4 أبواب', '15 طاولة', '20 كرسي', '15 طاولة', '20 كرسي'],
    image: 'assets/school1.jpeg'
  },
  {
    name: 'مدرسة النور',
    province: 'إدلب',
    city: 'سراقب',
    needs: ['10 مقاعد', 'سبورة', '10 كراسي', 'مدافئ', '10 شبابيك'],
    image: 'assets/school2.jpg'
  },
  {
    name: 'مدرسة النهضة',
    province: 'ريف دمشق',
    city: 'حرستا',
    needs: ['5 شبابيك', '7 طاولات'],
    image: 'assets/school2.jpg'
  },
  {
    name: 'مدرسة المتفوقين',
    province: 'حلب',
    city: 'صلاح الدين',
    needs: ['22 نوافذ', '11 أبواب', '4 طاولة'],
    image: 'assets/school1.jpeg'
  },
  {
    name: 'مدرسة المنارة',
    province: 'حلب',
    city: 'كفر حمرة',
    needs: ['18 نوافذ', '20 أبواب', '6 طاولة'],
    image: 'assets/school1.jpeg'
  },
  {
    name: 'مدرسة النور',
    province: 'إدلب',
    city: 'سراقب',
    needs: ['10 مقاعد', 'سبورة'],
    image: 'assets/school2.jpg'
  },
  {
    name: 'مدرسة النهضة',
    province: 'ريف دمشق',
    city: 'حرستا',
    needs: ['5 شبابيك', '7 طاولات'],
    image: 'assets/school2.jpg'
  },
  {
    name: 'مدرسة المتفوقين',
    province: 'حلب',
    city: 'صلاح الدين',
    needs: ['22 نوافذ', '11 أبواب', '4 طاولة'],
    image: 'assets/school1.jpeg'
  },
  {
    name: 'مدرسة المنارة',
    province: 'حمص',
    city: 'باب سباع',
    needs: ['18 نوافذ', '20 أبواب', '6 طاولة'],
    image: 'assets/school1.jpeg'
  }
];

  ngOnInit(): void {
    this.filteredSchools = this.schoolsData;
  }

  provinces = [...new Set(this.schoolsData.map(s => s.province))];
  selectedProvince: string | null = "";
  filteredSchools: School[] = []; 

  onProvinceChange() {
    if (this.selectedProvince) {
      this.filteredSchools = this.schoolsData.filter(s => s.province === this.selectedProvince);
    } else {
      this.filteredSchools = [];
    }
  }

  searchTerm: string = '';
  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();

    if (this.selectedProvince) {
      this.filteredSchools = this.schoolsData.filter(
        s =>
          s.province === this.selectedProvince &&
          (s.name.toLowerCase().includes(term) || s.city.toLowerCase().includes(term))
      );
    } else {
      this.filteredSchools = this.schoolsData.filter(
        s =>
          s.name.toLowerCase().includes(term) || s.city.toLowerCase().includes(term)
      );
    }
  }

  addSchool(){}

}

