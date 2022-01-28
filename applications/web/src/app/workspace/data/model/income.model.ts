import "../../../shared/extensions/number.extensions";
import "../../../shared/extensions/date.extensions";
import { IEntity } from "./state.model";
import { v4 as uuid } from "uuid";
import { differenceInDays } from "date-fns";

export interface IIncome extends IEntity {
    startedAt: Date;
    endedAt: Date;
    source: Source;
    sum: number;
    sumPerDay: number;
}

export class Income implements IIncome {
    public readonly id: string;
    public readonly createdAt: Date;

    public startedAt: Date;
    public endedAt: Date;
    public source: Source;
    public sum: number;
    public sumPerDay: number;

    constructor(
        startedAt: Date,
        endedAt: Date,
        source: Source,
        sum: number,
        now?: number,
    ) {
        this.id = uuid();
        this.createdAt = now ? new Date(now) : new Date();
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.source = source;
        this.sum = sum.round2();

        const range = differenceInDays(this.endedAt, this.startedAt) + 1;
        this.sumPerDay = this.sum / range;
    }
}

/*////////////////// TEMP CODE!!! //////////////////*/
export enum Source {
    Salary = 1,
    Deposit = 2,
}
/*//////////////////////////////////////////////////*/
