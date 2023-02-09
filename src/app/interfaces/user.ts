export interface User {
    nickname?: string,
    email: string;
    password: string,
    access_token?: string;
    role?: string;
    type? : number;
    expires_in? : string;
}