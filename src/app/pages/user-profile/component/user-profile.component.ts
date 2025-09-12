import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserProfileComponent } from '../pop-up-user-profile/update-user-profile/update-user-profile.component';
import { School, User } from '../models/user-profile.model';
import { UserProfileService } from '../services/user-profile.services';
import { ChangePasswordComponent } from '../pop-up-user-profile/change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { getUserInfo } from '../../../functions/getUserInfo';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userInfo: any;
  user!: User;
  schools: any = [];
  isDark: boolean = false;
  constructor( private dialog: MatDialog, private userService: UserProfileService,
                @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {
    this.getUserProfileData();
  }

  getUserProfileData() {
    this.user = getUserInfo();
    this.userService.getUserData(this.user.userId).subscribe(res => {
      this.user = res;
      localStorage.setItem('user-Info', JSON.stringify(res));

      if (this.user) {
        this.schools = this.user.schools;
        this.isDark = this.user.isDarkMode!;
        const saved = this.isDark? 'dark' : 'light';
        // const saved = 'dark'
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        console.log(prefersDark)
        const startDark = saved ? saved === 'dark' : prefersDark;
        this.applyTheme(startDark)
      }
    })
  }

  editProfile() {
    const dialogRef = this.dialog.open(UpdateUserProfileComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        usreData: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.user.email = result.email;
        this.user.username = result.username;
        this.user.fullName = result.fullName;
      }
    });

  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        usreData: this.user
      }
    });
  }

  convertToDataUrl(fileContents: string, contentType: string): string {
    return `data:${contentType};base64,${fileContents}`;
  }

  onThemeToggle(ev: Event) {
    console.log(ev)
    const checked = (ev.target as HTMLInputElement).checked;
    this.applyTheme(checked);
  }

  private applyTheme(dark: boolean) {
    this.isDark = dark;
    // أضف/أزل كلاس .dark على <html>
    this.doc.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  logout(){
    localStorage.clear();
  }

}  