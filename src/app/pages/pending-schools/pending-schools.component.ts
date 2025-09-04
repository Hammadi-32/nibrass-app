import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { SchoolsServices } from '../schools/services/schools.services';
import { School, UpdateSchool } from '../schools/schools-models/schools.model';

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
  pendingSchools: School[] = [];

  constructor(private schoolService: SchoolsServices) {

  }

  ngOnInit(): void {
    this.getSchools();
  }

  getSchools() {
    this.schoolService.getNonApprovedSchools().subscribe(res => {
      this.pendingSchools = res;
    })
  }
  approveSchool(commingSchool: School, index: number) {
    const school = commingSchool;
    school.isApproved = true;
    const newData: UpdateSchool = {
      city: school.city,
      description: school.description,
      nameAr: school.nameAr,
      nameEn: school.nameEn,
      schoolId: school.schoolId,
      needs: school.needs,
      estimatedRenovationCost: school.estimatedRenovationCost,
      governorateId: school.governorteId,
      headTeacherName: school.headTeacherName,
      headTeacherNumber: school.headTeacherNumber!,
      isRequirementsMet: school.isRequirementsMet,
      isApproved: true,
    }
    this.schoolService.updateSchool(newData).subscribe();
    this.pendingSchools.splice(index, 1);
  }

  rejectSchool(schoolId: string, index: number) {
    this.schoolService.deleteSchool(schoolId).subscribe(res => { })
    this.pendingSchools.splice(index, 1);
  }
}
