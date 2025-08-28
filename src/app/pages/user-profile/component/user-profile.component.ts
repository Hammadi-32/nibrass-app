import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserProfileComponent } from '../pop-up-user-profile/update-user-profile/update-user-profile.component';
import { User } from '../models/user-profile.model';
import { UserProfileService } from '../services/user-profile.services';
import { ChangePasswordComponent } from '../pop-up-user-profile/change-password/change-password.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports:
    [
      CommonModule,
      FormsModule,
      RouterModule
    ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor
    (
      private dialog: MatDialog,
      private userService: UserProfileService
    ) {

  }

  ngOnInit(): void {
    this.getUserProfileData();
  }

  // user!: User;
   user: User = {
    userId: 'u_001',
    username: 'hamza.al.saado',
    email: 'hamza.al.saado@gmail.com',
    password: '9808080',
    role: 'مدير',
    fullName: 'حمزة السعدو',
    createdAt: new Date(),
    isActive: true,
    imageSrc: 'assets/profile-1.png',
  };

  schools = [
    { governorate: 'دمشق', city: 'المزة', name: 'مدرسة النهضة', view: true, edit: false, delete: false },
    { governorate: 'حلب', city: 'سيف الدولة', name: 'مدرسة السلام', view: false, edit: true, delete: false },
    { governorate: 'حمص', city: 'كرم الشامي', name: 'مدرسة الوحدة', view: true, edit: true, delete: true }
  ];

  getUserProfileData() {
    this.userService.getUserData('ecd6a5af-89f7-452d-9bb4-eb72c4966c66').subscribe(res => {
      this.user = res;
      this.user.imageSrc = this.convertToDataUrl(this.user.profileImageUrl?.base64String!, this.user.profileImageUrl?.contentType!)
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

  logout(){

  }

}
