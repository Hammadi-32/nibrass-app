import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddSchoolDialogComponent } from './add-school-dialog/add-school-dialog.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SchoolsServices } from './services/schools.services';
import { Governorates } from '../Governorates/models/governorate.model';
import { GovernorateServices } from '../Governorates/services/governorate.services';
import { getUserInfo } from '../../functions/getUserInfo';
import { School } from './schools-models/schools.model';

interface fSchool {
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
}

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.scss',
})

export class SchoolsComponent implements OnInit {
  constructor(private dialog: MatDialog, 
              private router: Router, 
              private schoolsService: SchoolsServices,
              private governorateServices: GovernorateServices){}
  
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

  userId!: string;
  provinces = [...new Set(this.schoolsData.map(s => s.province))];
  selectedGovernorateId: string | null = "";
  schools: School[] = [];
  filteredSchools: School[] = []; 

   ngOnInit(): void {
    this.getschools();
    this.getGovernorates();

    const userInfo = getUserInfo()
    if (userInfo) {
      this.userId = userInfo.userId;
    }
  }

  getschools() {
    this.schoolsService.getSchoolss().subscribe(res => {
      this.schools = res
      this.filteredSchools = res;
    })
  }

  onProvinceChange() {
    if (this.selectedGovernorateId) {
      this.filteredSchools = this.schools.filter(s => s.governorateId === this.selectedGovernorateId);
    } else {
      this.filteredSchools = [];
    }
  }

  searchTerm: string = '';
  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();

    if (this.selectedGovernorateId) {
      this.filteredSchools = this.schools.filter(
        s =>
          s.governorateId === this.selectedGovernorateId &&
          (s.nameAr.toLowerCase().includes(term) || s.city.toLowerCase().includes(term))
      );
    } else {
      this.filteredSchools = this.schools.filter(
        s =>
          s.nameAr.toLowerCase().includes(term) || s.city.toLowerCase().includes(term)
      );
    }
  }

  addSchool(){
    const dialogRef = this.dialog.open(AddSchoolDialogComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        governorates: this.governorates,
        userId: this.userId
      }
    });
    dialogRef.afterClosed().subscribe(result =>{
      if (result) {
        this.schoolsService.addSchool(result).subscribe(res => {
          console.log('added: ', res)
        })
        this.filteredSchools.push(result);
      }
    })
  }

  goToDetails(){
    this.router.navigateByUrl('schools/11/school-details')
  }

  governorates: Governorates[] = []
  getGovernorates(){
    this.governorateServices.getListGovernorates().subscribe(res => {
      this.governorates = res;
    })
  }
}

