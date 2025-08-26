import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

// دالة التحقق من تطابق كلمتي المرور (للتسجيل)
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { mismatch: true };
  }
  return null;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authForm!: FormGroup;
  isLoginMode = true; // true لتسجيل الدخول، false للتسجيل
  hidePassword = true;
  hideConfirmPassword = true;
  show: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: [''],
      lastName: [''],
      confirmPassword: [''],
      role: [''],
      remember: [false]
    });

    if (!this.isLoginMode) {
      this.authForm.addControl('confirmPassword', this.fb.control('', [Validators.required]));
      this.authForm.setValidators(passwordMatchValidator); // تطبيق التحقق على مستوى النموذج
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.initForm(); // إعادة تهيئة النموذج عند تبديل الوضع
  }
  errorMessage: string = 'خطأ في بيانات الدخول';
  onSubmit(): void {
    if (this.authForm.valid) {
      const email = this.authForm.value.email;
      const password = this.authForm.value.password;

      if (this.isLoginMode) {
        // هنا يمكنك استدعاء خدمة تسجيل الدخول الخاصة بك
        this.login()
      } else {
        const confirmPassword = this.authForm.value.confirmPassword;
        // هنا يمكنك استدعاء خدمة التسجيل الخاصة بك
      }
      // في كلا الحالتين، يمكنك توجيه المستخدم أو إظهار رسالة نجاح/خطأ
    } else {
      // التعامل مع النموذج غير الصالح (مثلاً، إظهار رسائل خطأ عامة أو تمييز الحقول)
      this.authForm.markAllAsTouched(); // لجعل جميع الحقول تظهر أخطائها
    }
  }

  login() {
    this.router.navigateByUrl('home');
  }

  invalid(ctrl: string) {
    const c = this.authForm.get(ctrl);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }
}
