export interface ISource {
    readonly id: number;
    readonly name: string;
}

export class Source implements ISource {
    constructor(public readonly id: number, public readonly name: string) {}
}
