import "../../shared/extensions/number.extensions";
import "../../shared/extensions/date.extensions";
import { v4 as uuid } from "uuid";

export interface IOutcome {
    id: string;
    createdAt: Date;
    processedAt: Date;
    category: Category;
    description: string | null;
    sum: number;
}

export class Outcome implements IOutcome {
    private _processedAt!: Date;

    public readonly id: string;
    public readonly createdAt: Date;
    public category: Category;
    public sum: number;
    public description: string | null;

    public get processedAt(): Date {
        return this._processedAt;
    }
    public set processedAt(value: Date) {
        this._processedAt = value.toDate();
    }

    constructor(
        processedAt: Date,
        category: Category,
        sum: number,
        description?: string,
    ) {
        this.id = uuid();
        this.createdAt = new Date();
        this.processedAt = processedAt;
        this.category = category;
        this.sum = sum.round2();
        this.description = description ? description : null;
    }
}

/*////////////////// TEMP CODE!!! //////////////////*/
export enum Category {
    Sport = 1,
    Food = 2,
}
/*//////////////////////////////////////////////////*/
