import { Component } from '@angular/core';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterOutlet,
            NavbarComponent, 
            FooterComponent
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'nibrass-app';

  constructor(private router: Router){}

  hideLayout(): boolean {
    return this.router.url === '/login'
  }
}
