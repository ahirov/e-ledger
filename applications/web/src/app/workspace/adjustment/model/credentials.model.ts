export interface ICredentials {
    readonly email: string;
    readonly password: string | null;

    copy(): ICredentials;
}

export interface ICredentialsView {
    email: string;
    password: string;
    passwordConfirm: string;

    get(): ICredentials;
    reset(): void;
}

export class Credentials implements ICredentials {
    constructor(
        public readonly email: string,
        public readonly password: string | null,
    ) {}

    public copy(): ICredentials {
        return new Credentials(this.email, this.password);
    }
}

export class CredentialsView implements ICredentialsView {
    private readonly _mockPassword = "xxxxxxxx";
    private _isMockPassword: boolean;

    public email: string;
    public password: string;
    public passwordConfirm: string;

    constructor() {
        this.email = "";
        this.password = this._mockPassword;
        this.passwordConfirm = this._mockPassword;
        this._isMockPassword = true;
    }

    public get(): ICredentials {
        return new Credentials(
            this.email,
            this._isMockPassword ? null : this.password,
        );
    }

    public reset(): void {
        if (this._isMockPassword) {
            this.password = "";
            this.passwordConfirm = "";
            this._isMockPassword = false;
        }
    }
}
