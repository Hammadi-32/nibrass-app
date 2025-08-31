// // src/app/core/auth.service.ts
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// export interface UserProfile { role?: string; [k: string]: any; }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private key = 'user-profile';
//   private _user$ = new BehaviorSubject<UserProfile | null>(this.read());
//   readonly user$ = this._user$.asObservable();

//   private read(): UserProfile | null {
//     try { const raw = localStorage.getItem(this.key); return raw ? JSON.parse(raw) : null; }
//     catch { return null; }
//   }

//   /** نادِها بعد تسجيل الدخول أو الخروج */
//   setUser(user: UserProfile | null) {
//     if (user) localStorage.setItem(this.key, JSON.stringify(user));
//     else      localStorage.removeItem(this.key);
//     this._user$.next(user);
//   }

//   /** تحديث تلقائي عند تغيير localStorage من تبويب آخر */
//   constructor() {
//     window.addEventListener('storage', (e) => {
//       if (e.key === this.key) this._user$.next(this.read());
//     });
//   }
// }
