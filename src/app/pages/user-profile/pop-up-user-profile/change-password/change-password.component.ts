import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserProfileService } from '../../services/user-profile.services';
import { User } from '../../models/user-profile.model';

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
      '../update-user-profile/update-user-profile.component.scss',
      './change-password.component.scss',
    ]
})
export class ChangePasswordComponent {
  userForm!: FormGroup;
  usreData!: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private fb: FormBuilder,
    private userProfileService: UserProfileService
  ) {
    this.usreData = data.usreData;
  }

  ngOnInit(): void {
    this.initForm();
  }

  formData(data: any) {
    this.saveChange();
  }

  initForm() {
    this.userForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: [{ value: '', disabled: !this.enableInput }, Validators.required],
      confirmPassword: [{ value: '', disabled: !this.enableInput }, Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  closeDialog(isSubmit: boolean = false) {
    this.dialogRef.close(isSubmit);
  }

  enableInput: boolean = false;
  validPassword() {
    this.userProfileService.IsValidPassword(this.userForm.value.oldPassword, this.usreData.userId).subscribe(res => {
      this.enableInput = res as boolean;
      if (this.enableInput) {
        this.userForm.get('newPassword')?.enable();
        this.userForm.get('confirmPassword')?.enable();
      } else {
        this.userForm.get('newPassword')?.disable();
        this.userForm.get('confirmPassword')?.disable();
      }
    })
  }

  saveChange() {
    this.userProfileService.changePassword(this.userForm.value.newPassword, this.usreData.userId).subscribe(res => {
      this.closeDialog();
    })
  }
}
