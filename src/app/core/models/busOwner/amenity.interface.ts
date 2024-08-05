export interface IAmenity {
    _id: string;
    title: string;
    icon: string;
    status: 'Active' | 'Inactive';
    slNo?: number;
}

export interface ICreateAmenityDto {
    title: string;
    icon: string;
    status: 'Active' | 'Inactive';
}

export interface IUpdateAmenityDto {
    title?: string;
    icon?: string;
    status?: 'Active' | 'Inactive';
}