import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip'; // << Add this
import { User } from '../../models/user-profile.model';
import { UserProfileService } from '../../services/user-profile.services';

@Component({
  selector: 'app-update-user-profile',
  imports:
    [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatTooltipModule,
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
    private fb: FormBuilder,
    private userServeic: UserProfileService
  ) {
    this.usreData = data.usreData;
  }

  ngOnInit(): void {
    this.initForm();
  }

  formData(data: FormGroup) {
    const newData = {
      userId: this.usreData.userId,
      username: data.value.username,
      email: data.value.email,
      fullName: data.value.fullName
    }
    this.seveChange(newData)
  }

  initForm() {
    this.userForm = this.fb.group({
      username: [this.usreData.username || '', Validators.required],
      fullName: [this.usreData.fullName || '', Validators.required],
      email: [this.usreData.email || '', Validators.required],
    });
  }

  closeDialog(data?: any) {
    this.dialogRef.close(data);
  }

  seveChange(data: any) {
    this.userServeic.updateUserProfile(data).subscribe(res => {
      this.closeDialog(data);
    })
  }
}
