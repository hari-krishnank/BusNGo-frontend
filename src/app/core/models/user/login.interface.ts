export interface ILoginOption {
    title: string;
    subtitle: string;
    description: string;
}

export interface ILoginResponse {
    access_token: string
}

export interface ILoginFormValue {
    email: string;
    password: string;
}