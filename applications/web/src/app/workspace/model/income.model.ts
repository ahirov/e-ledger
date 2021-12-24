import "../../shared/extensions/number.extensions";
import "../../shared/extensions/date.extensions";
import { IEntity, IEntityFilter } from "./state.model";
import { v4 as uuid } from "uuid";

export interface IIncome extends IEntity {
    startedAt: Date;
    endedAt: Date;
    source: Source;
    sum: number;
}

export class Income implements IIncome {
    public readonly id: string;
    public readonly createdAt: Date;

    public startedAt: Date;
    public endedAt: Date;
    public source: Source;
    public sum: number;

    constructor(startedAt: Date, endedAt: Date, source: Source, sum: number) {
        this.id = uuid();
        this.createdAt = new Date();
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.source = source;
        this.sum = sum.round2();
    }
}

export interface IIncomeFilter extends IEntityFilter {
    startedAt: Date | null;
    endedAt: Date | null;
    source: Source | null;
}

export class IncomeFilter implements IIncomeFilter {
    constructor(
        public startedAt: Date | null = null,
        public endedAt: Date | null = null,
        public source: Source | null = null,
    ) {}

    public any(): boolean {
        return this.startedAt || this.endedAt || this.source
            ? true
            : false;
    }

    public process(item: IIncome): boolean {
        const isStartedAt =
            this.startedAt === null ||
            this.startedAt <= item.endedAt;
        const isEndedAt =
            this.endedAt === null ||
            this.endedAt >= item.startedAt;
        const isSource =
            this.source === null ||
            this.source === item.source;

        return isStartedAt && isEndedAt && isSource;
    }
}

/*////////////////// TEMP CODE!!! //////////////////*/
export enum Source {
    Salary = 1,
    Deposit = 2,
}
/*//////////////////////////////////////////////////*/
