import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

interface SchoolModel {
  nameAr: string;
  nameEn: string;
  city: string;
  description: string;
  estimatedRenovationCost: number;
  governorateId: string;
  governorateName: string;
  userId: string;
  needs: string[];
  headTeacherName: string;
  headTeacherNumber: number;
}

@Component({
  selector: 'app-pending-schools',
  standalone: true,
  imports: [CommonModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './pending-schools.component.html',
  styleUrl: './pending-schools.component.scss'
})
export class PendingSchoolsComponent implements OnInit {
  pendingSchools: SchoolModel[] = JSON.parse(localStorage.getItem('pendingSchools') || '[]');
  approvedSchools: any[] = JSON.parse(localStorage.getItem('schools') || '[]');

  ngOnInit(): void {
    this.pendingSchools = [
      {
        nameAr: 'مدرسة الفتح',
        nameEn: 'Al Fateh',
        city: 'ضاحية الوليد',
        description: '',
        estimatedRenovationCost: 2000,
        governorateId: '02259351-89ba-4509-a73c-3f90c5ab92b5',
        governorateName: '',
        userId: 'حمص',
        needs: [
          '10 ابواب',
          '22 نافذة',
          '12 مدفئة'
        ],
        headTeacherName: 'محمد المختار',
        headTeacherNumber: 963953275789
      },
      {
        nameAr: 'مدرسة المنارة',
        nameEn: 'Al Fateh',
        city: 'ضاحية الوليد',
        description: '',
        estimatedRenovationCost: 2000,
        governorateId: '02259351-89ba-4509-a73c-3f90c5ab92b5',
        governorateName: '',
        userId: 'حمص',
        needs: [
          '10 ابواب',
          '22 نافذة',
          '12 مدفئة'
        ],
        headTeacherName: 'محمد المختار',
        headTeacherNumber: 963953275789
      },
      {
        nameAr: 'مدرسة الفتح',
        nameEn: 'Al Fateh',
        city: 'ضاحية الوليد',
        description: '',
        estimatedRenovationCost: 2000,
        governorateId: '02259351-89ba-4509-a73c-3f90c5ab92b5',
        governorateName: '',
        userId: 'حمص',
        needs: [
          '10 ابواب',
          '22 نافذة',
          '12 مدفئة'
        ],
        headTeacherName: 'محمد المختار',
        headTeacherNumber: 963953275789
      },
      {
        nameAr: 'مدرسة الفتح',
        nameEn: 'Al Fateh',
        city: 'ضاحية الوليد',
        description: '',
        estimatedRenovationCost: 2000,
        governorateId: '02259351-89ba-4509-a73c-3f90c5ab92b5',
        governorateName: '',
        userId: 'حمص',
        needs: [
          '10 ابواب',
          '22 نافذة',
          '12 مدفئة'
        ],
        headTeacherName: 'محمد المختار',
        headTeacherNumber: 963953275789
      }
    ]
  }

  approveSchool(index: number) {
    const school = this.pendingSchools[index];
    this.approvedSchools.push(school);
    this.pendingSchools.splice(index, 1);

    localStorage.setItem('schools', JSON.stringify(this.approvedSchools));
    localStorage.setItem('pendingSchools', JSON.stringify(this.pendingSchools));
  }

  rejectSchool(index: number) {
    this.pendingSchools.splice(index, 1);
    localStorage.setItem('pendingSchools', JSON.stringify(this.pendingSchools));
  }
}
