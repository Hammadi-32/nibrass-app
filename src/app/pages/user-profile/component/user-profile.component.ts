import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  constructor( private dialog: MatDialog, private userService: UserProfileService) {}

  ngOnInit(): void {
    this.getUserProfileData();
  }

  getUserProfileData() {
    this.user = getUserInfo();
    this.userService.getUserData(this.user.userId).subscribe(res => {
      this.user = res;
      // localStorage.removeItem('user-Info');
      localStorage.setItem('user-Info', JSON.stringify(res));
      // this.user.imageSrc = this.convertToDataUrl(this.user.profileImageUrl?.base64String!, this.user.profileImageUrl?.contentType!)
      console.log(res)
      if (this.user) {
        this.schools = this.user.schools;
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

  logout(){
    localStorage.clear();
  }

}  