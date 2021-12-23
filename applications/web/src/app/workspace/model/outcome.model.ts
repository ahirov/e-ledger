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

export interface IOutcomeFilter {
    processedAt: Date | null;
    category: Category | null;
    description: string | null;
}

export class OutcomeFilter implements IOutcomeFilter {
    constructor(
        public processedAt: Date | null = null,
        public category: Category | null = null,
        public description: string | null = null,
    ) {}
}

/*////////////////// TEMP CODE!!! //////////////////*/
export enum Category {
    Sport = 1,
    Food = 2,
}
/*//////////////////////////////////////////////////*/
