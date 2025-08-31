export interface School {
    schoolId: string;
    nameAr: string;
    nameEn: string;
    city: string;
    description: string;
    estimatedRenovationCost: number;
    governorateId: string;
    governortesName: string;
    headTeacherName: string;
    headTeacherNumber?: number;
    addedByUserId: string;
    isApproved: boolean;
    isRequirementsMet: boolean;
    needs: string[];
}

export interface SchoolForCreation {
  nameAr: string;
  nameEn: string;
  city: string;
  description: string;
  estimatedRenovationCost: number;
  governorateId: string;
  userId: string;
  needs: string[];
  headTeacherName: string;
  headTeacherNumber?: number;
}

// export class JsonSchoolData{
//     schoolsData: School[] = [
//     {
//       schoolId: '11',
//       name: 'مدرسة الأمل',
//       province: 'إدلب',
//       city: 'معرة مصرين',
//       needs: ['6 نوافذ', '4 أبواب', '15 طاولة', '20 كرسي', '15 طاولة', '20 كرسي'],
//       image: 'assets/school1.jpeg',
//       managerName: 'Hamza',
//       managerPhone: '963932588670'
//     },
//     {
//       schoolId: '22',
//       name: 'مدرسة النور',
//       province: 'إدلب',
//       city: 'سراقب',
//       needs: ['10 مقاعد', 'سبورة', '10 كراسي', 'مدافئ', '10 شبابيك'],
//       image: 'assets/school2.jpg',
//       managerName: 'Hamza',
//       managerPhone: '963932588670'
//     },
//     {
//       schoolId: '111111',
//       name: 'مدرسة النهضة',
//       province: 'ريف دمشق',
//       city: 'حرستا',
//       needs: ['5 شبابيك', '7 طاولات'],
//       image: 'assets/school2.jpg',
//       managerName: 'Hamza',
//       managerPhone: '963932588670'
//     },
//     {
//       schoolId: '111111',
//       name: 'مدرسة المتفوقين',
//       province: 'حلب',
//       city: 'صلاح الدين',
//       needs: ['22 نوافذ', '11 أبواب', '4 طاولة'],
//       image: 'assets/school1.jpeg',
//       managerName: 'Hamza',
//       managerPhone: '963932588670'
//     },
//     {
//       schoolId: '111111',
//       name: 'مدرسة المنارة',
//       province: 'حلب',
//       city: 'كفر حمرة',
//       needs: ['18 نوافذ', '20 أبواب', '6 طاولة'],
//       image: 'assets/school1.jpeg',
//       managerName: 'Hamza',
//       managerPhone: '963932588670'
//     },
//     {
//       schoolId: '111111',
//       name: 'مدرسة النور',
//       province: 'إدلب',
//       city: 'سراقب',
//       needs: ['10 مقاعد', 'سبورة'],
//       image: 'assets/school2.jpg',
//       managerName: 'Hamza',
//       managerPhone: '963932588670'
//     },
//     {
//       schoolId: '111111',
//       name: 'مدرسة النهضة',
//       province: 'ريف دمشق',
//       city: 'حرستا',
//       needs: ['5 شبابيك', '7 طاولات'],
//       image: 'assets/school2.jpg',
//       managerName: 'Hamza',
//       managerPhone: '+963932588670'
//     },
//     {
//       schoolId: '111111',
//       name: 'مدرسة المتفوقين',
//       province: 'حلب',
//       city: 'صلاح الدين',
//       needs: ['22 نوافذ', '11 أبواب', '4 طاولة'],
//       image: 'assets/school1.jpeg',
//       managerName: 'Hamza',
//       managerPhone: '+963932588670'
//     },
//     {
//       schoolId: '111111',
//       name: 'مدرسة المنارة',
//       province: 'حمص',
//       city: 'باب سباع',
//       needs: ['18 نوافذ', '20 أبواب', '6 طاولة'],
//       image: 'assets/school1.jpeg',
//       managerName: 'Hamza',
//       managerPhone: '+963932588670'
//     }
//   ];
// }