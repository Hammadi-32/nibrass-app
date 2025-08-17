import { FileData } from "../../user-profile/models/user-profile.model";

export interface Governorates {
    governorateId: string;
    nameAr: string;
    nameEn: string;
    cityCount: number;
    schoolCount?: number;
    description?: string;
    governorateImageUrl?: FileData;
    imageSrc?: string;
}

export interface ChartData {
    label: string;
    value: number;
}

export interface GovernorateSummary {
    governorateId: string;
    nameEn: string;
    nameAr: string;
    schoolsCoverage?: ChartData[];
    citiesCoverage?: ChartData[];
    damageChart?: ChartData[];
    coveredCities: number;
    totalCities: number;
    coveredSchools: number;
    totalSchools: number;
    damagePercentage: number;
}


export class JsonData {
    FakeGovernorates: Governorates[] = [
        { governorateId: '1111', nameAr: 'ادلب', nameEn: 'IDLIB', cityCount: 20, description: '', imageSrc: 'assets/idlib.jpg' },
        { governorateId: '2222', nameAr: 'حلب', nameEn: 'ALEPPO', cityCount: 20, description: '', imageSrc: 'assets/aleppo.jpeg' },
        { governorateId: '3333', nameAr: 'حماة', nameEn: 'HAMAH', cityCount: 20, description: '', imageSrc: 'assets/hamah.jpeg' },
        { governorateId: '44444', nameAr: 'حمص', nameEn: 'HOMS', cityCount: 20, description: '', imageSrc: 'assets/school2.jpg' },
        { governorateId: '55555', nameAr: 'اللاذقية', nameEn: 'LATAKIA', cityCount: 20, description: '', imageSrc: 'assets/school2.jpg' },
        { governorateId: '66666', nameAr: 'طرطوس', nameEn: 'TARTOUS', cityCount: 20, description: '', imageSrc: 'assets/school2.jpg' },
        { governorateId: '77777', nameAr: 'دمشق', nameEn: 'DAMASCUS', cityCount: 20, description: '', imageSrc: 'assets/school2.jpg' },
        { governorateId: '88888', nameAr: 'ريف دمشق', nameEn: 'DAMASCUS Countryside', cityCount: 20, description: '', imageSrc: 'assets/school2.jpg' },
        { governorateId: '99999', nameAr: 'القنيطرة', nameEn: 'QUNEITRA', cityCount: 20, description: '', imageSrc: 'assets/school2.jpg' },
        { governorateId: '101010', nameAr: 'درعا', nameEn: 'DARAA', cityCount: 20, description: '', imageSrc: 'assets/school2.jpg' },
        { governorateId: '11-11-11', nameAr: 'السويداء', nameEn: 'AS-SUAWDA', cityCount: 20, description: '', imageSrc: 'assets/school2.jpg' },
        { governorateId: '12-12-12', nameAr: 'دير الزور', nameEn: 'DEIR EZ-ZOR', cityCount: 20, description: '', imageSrc: 'assets/school2.jpg' },
        { governorateId: '13-13-13', nameAr: 'الرقة', nameEn: 'AL RAQQA', cityCount: 20, description: '', imageSrc: 'assets/school2.jpg' },
        { governorateId: '14-14-14', nameAr: 'الحسكة', nameEn: 'AL HASAKAH', cityCount: 20, description: '', imageSrc: 'assets/school2.jpg' }
    ]
}
