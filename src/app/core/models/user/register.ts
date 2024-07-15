export interface IRegistrationResponse {
    success:boolean
}

export interface IOtpVerificationResponse {
    message: string;
    token?: string;
}