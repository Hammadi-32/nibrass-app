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
}
export interface FileData {
    base64String: string;
    contentType: string
}
