export interface User {
    userId: string;
    username: string;
    email: string;
    fullName: string;
    createdAt: Date;
    isActive: boolean;
    profileImageUrl?: FileData;
    imageSrc?: string;
    schools?: School[];
    role: string;
    password: string;
    isDarkMode?: boolean;
    isArabic?: boolean;
}
export interface FileData {
    base64String: string;
    contentType: string
}
export interface School {
    schoolId: string;
    schoolName: string;
    governorateId: string;
    governorateName: string;
    cityId: string;
    cityName: string;
}
