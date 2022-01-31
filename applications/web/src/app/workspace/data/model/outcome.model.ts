import { IEntity } from "./state.model";
import { v4 as uuid } from "uuid";

export interface IOutcome extends IEntity {
    date: Date;
    category: Category;
    description: string | null;
    sum: number;
}

export class Outcome implements IOutcome {
    public readonly id: string;
    public readonly createdAt: Date;

    public date: Date;
    public category: Category;
    public sum: number;
    public description: string | null;

    constructor(
        date: Date,
        category: Category,
        sum: number,
        description: string,
        now?: number,
    ) {
        this.id = uuid();
        this.createdAt = now ? new Date(now) : new Date();
        this.date = date;
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
