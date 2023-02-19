export interface User {
    nickname?: string,
    email: string,
    password?: string,
    first?: string,

    access_token?: string,
    expires_in? : string
}