import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'governorates',
    loadComponent: () =>
      import('./components/Governorates/components/component/governorates.component').then((m) => m.GovernoratesComponent),
  },
  {
    path: 'schools',
    loadComponent: () => 
      import('./pages/schools/schools.component').then((m) => m.SchoolsComponent)
  },
  {
    path: 'governorates/:governorateId/governorate-details',
    loadComponent: () =>
      import('./components/Governorates/components/governorate-details/governorate-details.component').then((m) => m.GovernorateDetailsComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
