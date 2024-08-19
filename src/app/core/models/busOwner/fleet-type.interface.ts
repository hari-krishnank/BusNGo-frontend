export interface IFleetType {
    _id: string;
    fleetTypeName: string;
    seatLayout: string;
    facilities: string[] | string;
    isAC: boolean;
    isSleeper: boolean;
}

export interface IAmenity {
    _id: string;
    title: string;
}

export interface ISeatLayout {
    _id: string;
    layoutName: string;
}