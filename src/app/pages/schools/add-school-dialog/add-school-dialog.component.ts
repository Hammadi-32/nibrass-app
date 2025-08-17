import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-school-dialog',
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './add-school-dialog.component.html',
  styleUrl: './add-school-dialog.component.scss'
})
export class AddSchoolDialogComponent {
  provinces = ['إدلب', 'حلب', 'دمشق', 'حمص', 'حماة']; // مؤقتة

  school = {
    name: '',
    province: '',
    city: '',
    needs: [''],
    managerName: '',
    managerPhone: ''
  };

  constructor(private dialogRef: MatDialogRef<AddSchoolDialogComponent>) {}

  addNeed() {
    this.school.needs.push('');
  }

  removeNeed(index: number) {
    this.school.needs.splice(index, 1);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close(this.school);
  }
}
