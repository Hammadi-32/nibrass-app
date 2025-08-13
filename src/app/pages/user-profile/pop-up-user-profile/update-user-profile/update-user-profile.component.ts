import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip'; // << Add this
import { User } from '../../models/user-profile.model';

@Component({
  selector: 'app-update-user-profile',
  imports:
    [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatTooltipModule
    ],
  templateUrl: './update-user-profile.component.html',
  styleUrl: './update-user-profile.component.scss',
  standalone: true
})
export class UpdateUserProfileComponent implements OnInit {

  userForm!: FormGroup;
  usreData!: User;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateUserProfileComponent>,
    private fb: FormBuilder
  ) {
    this.usreData = data.usreData;
  }

  ngOnInit(): void {
    this.initForm();
  }

  formData(data: any) {
    console.log(data.value)
  }

  initForm() {
    this.userForm = this.fb.group({
      username: [this.usreData.username || '', Validators.required],
      fullName: [this.usreData.fullName || ''],
      email: [this.usreData.email || ''],
    });
  }
  closeDialog(isSubmit: boolean = false) {
    this.dialogRef.close(isSubmit);
  }
}
