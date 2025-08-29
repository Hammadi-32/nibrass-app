import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddSchoolDialogComponent } from './add-school-dialog/add-school-dialog.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SchoolsServices } from './services/schools.services';

interface School {
  name: string;
  province: string;
  city: string;
  needs: string[];
  image: string;
}

interface SwaggerSchool {
  nameAr: string;
  nameEn: string;
  addressDetails: string;
  cityId: string;
  schoolTypeId: string;
  schoolStatusId: string;
  latitude: string;
  longitude: string;
  conditionDescription: string;
  estimatedRenovationCost: string;
  studentCapacity: string;
  numberOfClassrooms: string;
  yearEstablished: string;
  addedByUserId: string;
  requiredRenovations: RequiredRenovations[];
}
interface RequiredRenovations{
  renovationTypeId: string;
  notes: string;
}

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.scss',
})

export class SchoolsComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router, private schoolsService: SchoolsServices){}
  
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
    this.getschools();
  }
  getschools() {
    this.schoolsService.getSchoolss().subscribe(res => {
      // console.log(res)
      this.filteredSchools = res;
    })
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

  addSchool(){
    const dialogRef = this.dialog.open(AddSchoolDialogComponent, {
      width: 'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result =>{
      if (result) {
        this.filteredSchools.push(result);
      }
    })
  }

  goToDetails(){
    this.router.navigateByUrl('schools/11/school-details')
  }
}

