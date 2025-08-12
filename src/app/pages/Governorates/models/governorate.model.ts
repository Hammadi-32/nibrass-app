export interface Governorates {
    governorateId: string;
    nameAr: string;
    nameEn: string;
    cityCount: number;
    cities: CityDetails[];
}

export interface CityDetails {
    cityId: string;
    nameAr: string;
    nameEn: string;
    schoolCount: number;
    schools: SchoolDetails[];
}
export interface SchoolDetails {
    schoolId: string;
    nameAr: string;
    nameEn: string;
    addressDetails: string;
    latitude: number;
    longitude: number;
    studentCapacity: number;
    numberOfClassrooms: number;
    yearEstablished: number;
}

export class JsonData {
    FakeGovernorates : Governorates[] = [
        {
            governorateId: '1111',
            nameAr: 'ادلب',
            nameEn: 'IDLIB',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '2222',
            nameAr: 'حلب',
            nameEn: 'ALEPPO',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '3333',
            nameAr: 'حماة',
            nameEn: 'HAMAH',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '44444',
            nameAr: 'حمص',
            nameEn: 'HOMS',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '55555',
            nameAr: 'اللاذقية',
            nameEn: 'LATAKIA',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '66666',
            nameAr: 'طرطوس',
            nameEn: 'TARTOUS',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '77777',
            nameAr: 'دمشق',
            nameEn: 'DAMASCUS',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '88888',
            nameAr: 'ريف دمشق',
            nameEn: 'DAMASCUS Countryside',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '99999',
            nameAr: 'القنيطرة',
            nameEn: 'QUNEITRA',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '101010',
            nameAr: 'درعا',
            nameEn: 'DARAA',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '11-11-11',
            nameAr: 'السويداء',
            nameEn: 'AS-SUAWDA',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '12-12-12',
            nameAr: 'دير الزور',
            nameEn: 'DEIR EZ-ZOR',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '13-13-13',
            nameAr: 'الرقة',
            nameEn: 'AL RAQQA',
            cityCount: 20,
            cities: []
        },
        {
            governorateId: '14-14-14',
            nameAr: 'الحسكة',
            nameEn: 'AL HASAKAH',
            cityCount: 20,
            cities: []
        }
    ]
}
