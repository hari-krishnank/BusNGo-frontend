export interface IRegistrationResponse {
    success: boolean
}

export interface IOtpVerificationResponse {
    message: string;
    token?: string;
}

export interface IRegistrationFormValue {
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmpassword: string;
}