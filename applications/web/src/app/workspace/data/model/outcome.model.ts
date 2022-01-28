import "../../../shared/extensions/number.extensions";
import "../../../shared/extensions/date.extensions";
import { IEntity } from "./state.model";
import { v4 as uuid } from "uuid";

export interface IOutcome extends IEntity {
    processedAt: Date;
    category: Category;
    description: string | null;
    sum: number;
}

export class Outcome implements IOutcome {
    public readonly id: string;
    public readonly createdAt: Date;

    public processedAt: Date;
    public category: Category;
    public sum: number;
    public description: string | null;

    constructor(
        processedAt: Date,
        category: Category,
        sum: number,
        description: string,
        now?: number,
    ) {
        this.id = uuid();
        this.createdAt = now ? new Date(now) : new Date();
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
