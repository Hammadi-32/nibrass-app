import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-change-password',
  imports:
    [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatTooltipModule
    ],
  templateUrl: './change-password.component.html',
  styleUrls:
    [
      './change-password.component.scss',
      '../update-user-profile/update-user-profile.component.scss'
    ]
})
export class ChangePasswordComponent {
  userForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  formData(data: any) {
    console.log(data.value)
  }

  initForm() {
    this.userForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  closeDialog(isSubmit: boolean = false) {
    this.dialogRef.close(isSubmit);
  }
}
