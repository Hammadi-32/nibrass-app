import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Governorates } from '../../../Governorates/models/governorate.model';


export interface SwaggerSchoolModel {
  nameAr: string;
  province: string;
  city: string;
  needs: string[];
  managerName: string;
  headTeacherNumber: string;
  notes?: string;
}


type GovernorateMin = Pick<Governorates, 'governorateId' | 'nameAr'>;

@Component({
  selector: 'app-delete-school-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

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
  templateUrl: './delete-school-dialog.component.html',
  styleUrls: ['./delete-school-dialog.component.scss'],
})
export class DeleteSchoolDialogComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(
    public dialogRef: MatDialogRef<DeleteSchoolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
