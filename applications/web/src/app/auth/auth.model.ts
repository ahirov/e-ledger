export class AuthCredentials {
    constructor(
        public email: string,
        public password: string,
        public returnSecureToken: boolean = true,
    ) {}

    public copy(): AuthCredentials {
        return new AuthCredentials(
            this.email,
            this.password,
            this.returnSecureToken,
        );
    }
}

export interface AuthResponse {
    localId: string;
    idToken: string;
    email: string;
    expiresIn: string;
    refreshToken: string;
    registered?: boolean;
}

export class AuthUser {
    public get token(): string | null {
        if (
            !this._token ||
            !this._tokenExpirationDate ||
            new Date() > this._tokenExpirationDate
        ) {
            return null;
        }
        return this._token;
    }

    public get tokenExpirationDate(): Date {
        return this._tokenExpirationDate;
    }

    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
    ) {}

    public copy(): AuthUser {
        return new AuthUser(
            this.email,
            this.id,
            this._token,
            this._tokenExpirationDate,
        );
    }
}
