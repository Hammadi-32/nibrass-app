import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddSchoolDialogComponent } from './school-pop-up/add-school-dialog/add-school-dialog.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SchoolsServices } from './services/schools.services';
import { Governorates } from '../Governorates/models/governorate.model';
import { GovernorateServices } from '../Governorates/services/governorate.services';
import { getUserInfo } from '../../functions/getUserInfo';
import { School } from './schools-models/schools.model';
import { CdkAutofill } from "@angular/cdk/text-field";
import { DeleteSchoolDialogComponent } from './school-pop-up/delete-school-dialog/delete-school-dialog.component';
import { UpdateSchoolDialogComponent } from './school-pop-up/update-school-dialog/update-school-dialog.component';

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
  imports: [CommonModule, FormsModule, MatIconModule, CdkAutofill],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.scss',
})

export class SchoolsComponent implements OnInit {
  constructor(private dialog: MatDialog,
    private router: Router,
    private schoolsService: SchoolsServices,
    private governorateServices: GovernorateServices) { }

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
      this.schools = res;
      console.log(res)
      this.filteredSchools = res;
      this.schools.forEach(s=>{
        s.imageSrc=this.convertToDataUrl(s.profileImageUrl?.base64String!, s.profileImageUrl?.contentType!)
      })
      console.log(this.schools)
    })
  }

  onProvinceChange() {
    if (this.selectedGovernorateId) {
      this.filteredSchools = this.schools.filter(s => s.governorteId === this.selectedGovernorateId);
      console.log(this.filteredSchools)
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
          s.governorteId === this.selectedGovernorateId &&
          (s.nameAr.toLowerCase().includes(term) || s.city.toLowerCase().includes(term))
      );
    } else {
      this.filteredSchools = this.schools.filter(
        s =>
          s.nameAr.toLowerCase().includes(term) || s.city.toLowerCase().includes(term)
      );
    }
  }

  addSchool() {
    const dialogRef = this.dialog.open(AddSchoolDialogComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        governorates: this.governorates,
        userId: this.userId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.schoolsService.addSchool(result).subscribe(res => {
          console.log('added: ', res)
          this.filteredSchools.push(res);
        })

      }
    })
  }

  deleteSchool(schoolId: string) {
    console.log(schoolId)
    const dialogRef = this.dialog.open(DeleteSchoolDialogComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        schoolId: schoolId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.schoolsService.deleteSchool(schoolId).subscribe(res => {
          this.filteredSchools = this.filteredSchools.filter(s => s.schoolId !== schoolId);
        })
      }
    })
  }

  updateSchool(schoolId: string) {
    const school = this.schools.find(s => s.schoolId == schoolId);
    const dialogRef = this.dialog.open(UpdateSchoolDialogComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        schoolData: school,
        governorates: this.governorates,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.schoolsService.updateSchool(result).subscribe(res => {
          let school = this.schools.find(s => s.schoolId == schoolId);
          if (school) {
            Object.assign(school, result);
          }
        })
      }
    })
  }

  goToDetails(schooleId: string) {
    this.router.navigateByUrl(`schools/${schooleId}/school-details`)
  }

  governorates: Governorates[] = []
  getGovernorates() {
    this.governorateServices.getListGovernorates().subscribe(res => {
      this.governorates = res;
    })
  }

  convertToDataUrl(fileContents: string, contentType: string): string {
    return `data:${contentType};base64,${fileContents}`;
  }

}

