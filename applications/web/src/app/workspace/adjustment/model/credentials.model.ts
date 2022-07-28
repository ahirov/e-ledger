export interface ICredentials {
    readonly email: string;
    readonly password: string | null;

    copy(): ICredentials;
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
