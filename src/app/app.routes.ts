import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthLayoutComponent } from './auth/layout/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'تسجيل الدخول' },
      { path: 'register', component: RegisterComponent, title: 'إنشاء حساب' },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },
];

export const routes: Routes = [
  ...AUTH_ROUTES,
  {
    path: 'home', component: HomeComponent, title: 'الرئيسية'
  },
  {
    path: 'governorates',
    loadComponent: () =>
      import('./pages/Governorates/components/component/governorates.component').then((m) => m.GovernoratesComponent),
    title: 'المحافظات'
  },
  {
    path: 'schools',
    loadComponent: () =>
      import('./pages/schools/schools.component').then((m) => m.SchoolsComponent),
    title: 'المدارس المتضررة'
  },
  {
    path: 'schools/:schoolId/school-details',
    loadComponent: () =>
      import('./pages/schools/school-details//school-details.component').then((m) => m.SchoolDetailsComponent),
    title: 'معلومات المدرسة'
  },
  {
    path: 'pending-schools',
    loadComponent: () =>
      import('./pages/pending-schools/pending-schools.component').then((m) => m.PendingSchoolsComponent),
    title: 'مدارس بانتظار المراحعة'
  },
  {
    path: 'governorates/:governorateId/governorate-details',
    loadComponent: () =>
      import('./pages/Governorates/components/governorate-details/governorate-details.component').then((m) => m.GovernorateDetailsComponent),
    title: 'معلومات المحافظة'
  },
  {
    path: 'cities',
    loadComponent: () =>
      import('./pages/cities/component/cities.component').then((m) => m.CitiesListComponent),
    title: 'المدن'
  },
  {
    path: 'governorates/:governorateId/cities',
    loadComponent: () =>
      import('./pages/cities/governorate-cities-list-component/governorate-cities-list-component.component').then((m) => m.GovernorateCitiesListComponentComponent),
    title: 'المدن'
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./pages/user-profile/component/user-profile.component').then((m) => m.UserProfileComponent),
    title: 'الملف الشخصي'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'من نحن'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];