import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports:
    [
      RouterModule,
      CommonModule
    ],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Output() toggleSideBar = new EventEmitter<boolean>()
  sidebarClosed: boolean = false;
  menuItems = [
    { icon: 'account_circle', label: 'الملف الشخصي', route: '/profile' },
    { icon: 'account_balance', label: 'المحافظات', route: '/governorates' },
    { icon: 'location_city', label: 'المدن', route: '/cities' },
    { icon: 'school', label: 'المدارس', route: '/schools' },
    { icon: 'insert_chart', label: 'التقارير', route: '/reports' },
  ];

  sideBar() {
    this.sidebarClosed = !this.sidebarClosed;
    this.toggleSideBar.emit(this.sidebarClosed);
  }
}
