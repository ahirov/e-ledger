import { v4 as uuid } from "uuid";
import { IEntity } from "./state.model";
import { ICategory } from "../../adjustment/model/outcome.model";

interface IOutcomeCommon extends IEntity {
    readonly date: Date;
    readonly sum: number;
    readonly description: string | null;
}

export interface IOutcomeData extends IOutcomeCommon {
    readonly categoryId: number;
}

export interface IOutcome extends IOutcomeCommon {
    readonly category: ICategory;
}

export class OutcomeData implements IOutcomeData {
    public readonly id: string;
    public readonly created: Date;

    public readonly date: Date;
    public readonly sum: number;
    public readonly categoryId: number;
    public readonly description: string | null;

    constructor(
        date: Date,
        sum: number,
        categoryId: number,
        description: string,
        now?: number,
    ) {
        this.id = uuid();
        this.created = now ? new Date(now) : new Date();
        this.date = date;
        this.categoryId = categoryId;
        this.sum = sum.round2();
        this.description = description ? description : null;
    }
}

export class Outcome implements IOutcome {
    constructor(
        public readonly id: string,
        public readonly created: Date,
        public readonly date: Date,
        public readonly sum: number,
        public readonly description: string | null,
        public readonly category: ICategory,
    ) {}
}
