import "../../shared/extensions/number.extensions";
import "../../shared/extensions/date.extensions";
import { IEntity, IEntityFilter } from "./state.model";
import { v4 as uuid } from "uuid";

export interface IOutcome extends IEntity {
    processedAt: Date;
    category: Category;
    description: string | null;
    sum: number;
}

export interface IOutcomeFilter extends IEntityFilter {
    processedAt: Date | null;
    category: Category | null;
    description: string | null;
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
        description: string | null,
    ) {
        this.id = uuid();
        this.createdAt = new Date();
        this.processedAt = processedAt;
        this.category = category;
        this.sum = sum.round2();
        this.description = description;
    }
}

export class OutcomeFilter implements IOutcomeFilter {
    constructor(
        public processedAt: Date | null = null,
        public category: Category | null = null,
        public description: string | null = null,
    ) {}

    public any(): boolean {
        return this.processedAt || this.category || this.description
            ? true
            : false;
    }

    public process(item: IOutcome): boolean {
        const isProcessedAt =
            this.processedAt === null ||
            this.processedAt.getTime() === item.processedAt.getTime();
        const isCategory =
            this.category === null ||
            this.category === item.category;
        const isDescription =
            this.description === null ||
            (item.description !== null &&
                item.description?.indexOf(this.description) !== -1);

        return isProcessedAt && isCategory && isDescription;
    }
}

/*////////////////// TEMP CODE!!! //////////////////*/
export enum Category {
    Sport = 1,
    Food = 2,
}
/*//////////////////////////////////////////////////*/
