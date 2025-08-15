import { FileData } from "../../user-profile/models/user-profile.model";

export interface CityDetails {
    cityId: string;
    nameAr: string;
    nameEn: string;
    schoolCount: number;
    governorateId: string;
    governorateNameAr: string;
    governorateNameEn: string;
    description: string;
    cityImageUrl?: FileData;
}