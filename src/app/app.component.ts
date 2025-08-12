import { Component } from '@angular/core';
import { FooterComponent } from './pages/shared/footer/footer.component';
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
    FooterComponent,
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
    return this.router.url === '/login'
  }

  sidebarClosed: boolean = false;
  toggleSideBar(event: boolean) {
    this.sidebarClosed = event;
    console.log(event)
  }
}
