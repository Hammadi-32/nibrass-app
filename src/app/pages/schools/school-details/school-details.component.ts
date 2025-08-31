import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { School } from '../schools-models/schools.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SchoolsServices } from '../services/schools.services';

@Component({
  standalone: true,
  selector: 'app-school-details',
  imports: [CommonModule,
    // Material
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatAutocompleteModule,
  ],
  templateUrl: './school-details.component.html',
  styleUrl: './school-details.component.scss'
})
export class SchoolDetailsComponent implements OnInit{
  school!: any;
  constructor(private route: ActivatedRoute, private router: Router, private schoolService: SchoolsServices){}

  ngOnInit(): void {
    // this.school = null;
    this.getData();
  }
  
  getData(){
    this.schoolService.getSchoolById('eab8b6a3-76e2-4955-9130-54ef9dd8899d').subscribe(res => {
      this.school = res;
      console.log(this.school)
    })
  }

  goBack(){
    this.router.navigate(['/schools']);
  }
}
