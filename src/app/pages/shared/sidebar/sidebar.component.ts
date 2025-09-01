import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { getUserInfo } from '../../../functions/getUserInfo';
import { filter } from 'rxjs';

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
  userRole: string = '11';
  userInfo: any;
  isLoggedin: boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
    .subscribe(() => {
      const raw = localStorage.getItem('user-Info');
      const user = raw ? JSON.parse(raw) : null;
      this.isLoggedin = !!user;
      this.userRole   = user?.roleId ?? '01';
      console.log(this.userRole)
    });
  }

  menuItems = [
    { icon: 'account_circle',   label: 'الملف الشخصي',            route: '/user-profile', onlyUser: true },
    { icon: 'home',             label: 'الرئيسية',                route: '/home' },
    { icon: 'school',           label: 'المدارس',                 route: '/schools' },
    { icon: 'account_balance',  label: 'المحافظات',               route: '/governorates' },
    { icon: 'hourglass_bottom', label: 'طلبات المدارس', route: '/pending-schools', onlyAdmin: true },
    { icon: 'info',             label: 'من نحن',                  route: '/about' },
    // { icon: 'location_city', label: 'المدن',                   route: '/cities' },
    // { icon: 'insert_chart',  label: 'التقارير',                route: '/reports' },
  ];

  sideBar() {
    this.sidebarClosed = !this.sidebarClosed;
    this.toggleSideBar.emit(this.sidebarClosed);
  }
}
