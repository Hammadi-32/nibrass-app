import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
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
    path: 'governorates/:governorateId/governorate-details',
    loadComponent: () =>
      import('./components/Governorates/components/governorate-details/governorate-details.component').then((m) => m.GovernorateDetailsComponent),
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
];
