import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { getUserInfo } from '../../../functions/getUserInfo';

@Component({
  selector: 'app-sidebar',
  imports:[ RouterModule, CommonModule ],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  
  @Output() toggleSideBar = new EventEmitter<boolean>()
  sidebarClosed: boolean = true;
  userRole: string = 'admin';
  userInfo: any;

  ngOnInit(): void {
    this.userInfo = getUserInfo();
    this.userRole = this.userInfo.role
  }

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
