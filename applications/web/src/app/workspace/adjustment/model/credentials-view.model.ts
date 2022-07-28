import { Credentials, ICredentials } from "./credentials.model";

export interface ICredentialsView {
    email: string;
    password: string;
    passwordConfirm: string;

    init(email: string | undefined): void;
    reset(): void;
    clearPassword(): void;
    get(): ICredentials;
}

export class CredentialsView implements ICredentialsView {
    private readonly _mockPassword = "xxxxxxxx";
    private _isMockPassword!: boolean;
    private _originalEmail!: string;

    public email!: string;
    public password!: string;
    public passwordConfirm!: string;

    constructor() {
        this.init("");
    }

    public init(email: string): void {
        this._originalEmail = email;
        this.reset();
    }

    public reset(): void {
        this.email = this._originalEmail;
        this.password = this._mockPassword;
        this.passwordConfirm = this._mockPassword;
        this._isMockPassword = true;
    }

    public clearPassword(): void {
        if (this._isMockPassword) {
            this.password = "";
            this.passwordConfirm = "";
            this._isMockPassword = false;
        }
    }

    public get(): ICredentials {
        return new Credentials(
            this.email,
            this._isMockPassword ? null : this.password,
        );
    }
}
