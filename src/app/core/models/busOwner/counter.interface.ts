export interface ICounter {
    _id: string;
    name: string;
    city: string;
    location: string;
    mobileNumber: string;
    status: 'Active' | 'Inactive';
}

export interface CountersResponse {
    counters: ICounter[];
    total: number;
}