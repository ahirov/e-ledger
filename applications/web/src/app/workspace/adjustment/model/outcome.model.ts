export interface ICategory {
    readonly id: number;
    readonly name: string;
}

export class Category implements ICategory {
    constructor(public readonly id: number, public readonly name: string) {}
}
