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
      import('./pages/Governorates/components/component/governorates.component').then((m) => m.GovernoratesComponent),
  },
  {
    path: 'schools',
    loadComponent: () =>
      import('./pages/schools/schools.component').then((m) => m.SchoolsComponent)
  },
  {
    path: 'governorates/:governorateId/governorate-details',
    loadComponent: () =>
      import('./pages/Governorates/components/governorate-details/governorate-details.component').then((m) => m.GovernorateDetailsComponent),
  },
  {
    path: 'cities',
    loadComponent: () =>
      import('./pages/cities/component/cities.component').then((m) => m.CitiesListComponent),
  },
  {
    path: 'governorates/:governorateId/cities',
    loadComponent: () =>
      import('./pages/cities/governorate-cities-list-component/governorate-cities-list-component.component').then((m) => m.GovernorateCitiesListComponentComponent),
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./pages/user-profile/component/user-profile.component').then((m) => m.UserProfileComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];