import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Role {
  id: string;
  name: string;
}

interface User {
  userId: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  roleId: string;
  role: Role;
  createdAt: Date;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports:
    [
      CommonModule
    ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  user: User = {
    userId: 'f3b92a12-ef47-4c25-93ef-3f8f8c3a4d44',
    username: 'hammadi',
    email: 'hammadi@example.com',
    password: '********',
    fullName: 'Hammadi Alhammadi',
    roleId: '12345-role-id',
    role: { id: '12345-role-id', name: 'Administrator' },
    createdAt: new Date('2025-08-01T10:00:00')
  };

  editProfile() {
    alert('Edit profile clicked!');
  }
}
