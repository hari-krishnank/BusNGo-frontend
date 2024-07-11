export interface IRegistrationResponse {
    message: string;
    userId: string;
}


export interface IOtpVerificationResponse {
    message: string;
    token?: string;
}