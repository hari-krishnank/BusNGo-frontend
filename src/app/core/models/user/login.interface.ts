export interface ILoginOption {
    title: string;
    subtitle: string;
    description: string;
}

export interface ILoginResponse {
    access_token: string;
    refresh_token: string; 
    user: {
        userId: string;
        email: string;
        username: string;
        phone: string;
    };
}

export interface ILoginFormValue {
    email: string;
    password: string;
}