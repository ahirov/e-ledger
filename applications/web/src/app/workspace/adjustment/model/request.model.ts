export interface ISettingRequest {
    readonly idToken: string;
    readonly email: string;
    readonly password?: string;
    readonly returnSecureToken: boolean;

    copy(): ISettingRequest;
}

export class SettingRequest implements ISettingRequest {
    constructor(
        public readonly idToken: string,
        public readonly email: string,
        public readonly password?: string,
        public readonly returnSecureToken: boolean = true,
    ) {}

    public copy(): ISettingRequest {
        return new SettingRequest(
            this.idToken,
            this.email,
            this.password,
            this.returnSecureToken,
        );
    }
}
