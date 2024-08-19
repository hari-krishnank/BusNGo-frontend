export interface ISeatLayout {
    _id: string;
    layoutName: string;
    rows: number;
    columns: number;
    status: string;
    upperDeck: boolean;
    selectedSeats: string[];
}

export interface SeatLayoutDisplay extends ISeatLayout {
    siNo: number;
    totalSeats: number;
}

export interface SeatLayoutFormData {
    layoutName: string;
    rows: number;
    columns: number;
    status: string;
    upperDeck: boolean;
}