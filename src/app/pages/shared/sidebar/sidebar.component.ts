import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports:[ RouterModule, CommonModule ],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Output() toggleSideBar = new EventEmitter<boolean>()
  sidebarClosed: boolean = true;
  userRole: string = 'admin';

  menuItems = [
    { icon: 'account_circle', label: 'الملف الشخصي', route: '/user-profile' },
    { icon: 'home', label: 'الرئيسية', route: '/home' },
    { icon: 'account_balance', label: 'المحافظات', route: '/governorates' },
    { icon: 'location_city', label: 'المدن', route: '/cities' },
    { icon: 'school', label: 'المدارس', route: '/schools' },
    { icon: 'insert_chart', label: 'التقارير', route: '/reports' },
    { icon: 'hourglass_bottom', label: 'مدارس بانتظار المراجعة', route: '/pending-schools', onlyAdmin: true },
  ];

  sideBar() {
    this.sidebarClosed = !this.sidebarClosed;
    this.toggleSideBar.emit(this.sidebarClosed);
  }
}
