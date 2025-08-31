export interface School {
  schoolId: string;
  nameAr: string;
  nameEn: string;
  city: string;
  description: string;
  estimatedRenovationCost: number;
  governorteId: string;
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

export interface CreateSchool {
  nameAr: string;
  nameEn: string;
  city: string;
  description: string;
  estimatedRenovationCost: number;
  governorateId: string;
  userId: string;
  needs: string[];
  headTeacherName: string;
  headTeacherNumber: number;
  schoolImageBase64?: string | null;
}

export interface UpdateSchool {
  schoolId: string;
  nameAr: string;
  nameEn: string;
  city: string;
  description: string;
  estimatedRenovationCost: number;
  governorateId: string;
  needs: string[];
  headTeacherName: string;
  headTeacherNumber: number;
  isRequirementsMet: boolean;
}

