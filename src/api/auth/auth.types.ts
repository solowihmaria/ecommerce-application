export interface LoginResponse {
    access_token: string;
    expires_in: number;
    scope: string;
    refresh_token: string;
    token_type: string;
}
