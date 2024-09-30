export interface IStaffs {
    _id: string;
    username: string;
    email: string;
    mobile: string;
    bus: {
        _id: string;
        name: string;
    } | any;
}

export interface ICreateStaff {
    username: string;
    email: string;
    mobile: string;
    bus: string;
}