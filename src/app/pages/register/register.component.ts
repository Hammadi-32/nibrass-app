import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

function match(a: string, b: string) {
  return (group: AbstractControl) => {
    const one = group.get(a)?.value, two = group.get(b)?.value;
    return one && two && one !== two ? { mismatch: true } : null;
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {
  form!: FormGroup;
  show1 = false; show2 = false;
  error = '';

initForm() {
  this.form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]],
  }, { validators: match('password', 'confirmPassword') });
}

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }
  
  invalid(ctrl: string) {
    const c = this.form.get(ctrl);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  submit() {
    if (this.form.invalid) return;
    // TODO: استدعاء API فعلي
    this.error = '';
    // بعد النجاح -> تنقل: this.router.navigate(['/auth/login'], { queryParams: { registered: 1 } });
  }
}
