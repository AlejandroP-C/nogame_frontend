export interface User {
    nickname?: string,
    email: string,
    password?: string,
    
    access_token?: string,
    expires_in? : string
}