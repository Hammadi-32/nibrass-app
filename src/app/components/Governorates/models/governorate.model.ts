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
