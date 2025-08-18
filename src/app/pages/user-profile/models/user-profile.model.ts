export interface User {
    userId: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: string;
    createdAt: Date;
    isActive: boolean;
    profileImageUrl?: FileData;
    imageSrc?: string;
    schools?: School[];
}
export interface FileData {
    base64String: string;
    contentType: string
}
export interface School {
    schoolId: string;
    governorateId: string;
    cityId: string;
    governorateName: string;
    cityName: string;
    schoolName: string;
}
