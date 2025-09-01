export interface SchoolStatisticsDto {
    schoolStatistics: SchoolStatistics;
    statisticsByGovernorate: SchoolStatisticsByGovernorate;
}

export interface SchoolStatistics { 
    totalSchools: number;
    coveredSchools: number;
    damagedSchools: number;
    donors: number;
}

export interface SchoolStatisticsByGovernorate {
    governorateName: string;
    totalSchools: number;
    coveredSchools: number;
    damagedSchools: number;
}