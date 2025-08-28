import { Component } from '@angular/core';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./pages/shared/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'nibrass-app';

  constructor(private router: Router) { }

  hideLayout(): boolean {
    const shouldHide = this.router.url === '/auth/login' || this.router.url === '/auth/register';
    return shouldHide;
  }

  sidebarClosed: boolean = true;
  toggleSideBar(event: boolean) {
    this.sidebarClosed = event;
  }
}
