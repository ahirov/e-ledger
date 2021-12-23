import "../../shared/extensions/number.extensions";
import "../../shared/extensions/date.extensions";
import { v4 as uuid } from "uuid";

export interface IIncome {
    id: string;
    createdAt: Date;
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

export interface IIncomeFilter {
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
}

/*////////////////// TEMP CODE!!! //////////////////*/
export enum Source {
    Salary = 1,
    Deposit = 2,
}
/*//////////////////////////////////////////////////*/
