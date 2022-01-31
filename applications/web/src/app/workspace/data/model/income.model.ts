import { IEntity } from "./state.model";
import { v4 as uuid } from "uuid";
import { differenceInDays } from "date-fns";

export interface IIncome extends IEntity {
    from: Date;
    to: Date;
    source: Source;
    sum: number;
    sumPerDay: number;
}

export class Income implements IIncome {
    public readonly id: string;
    public readonly createdAt: Date;

    public from: Date;
    public to: Date;
    public source: Source;
    public sum: number;
    public sumPerDay: number;

    constructor(
        from: Date,
        to: Date,
        source: Source,
        sum: number,
        now?: number,
    ) {
        this.id = uuid();
        this.createdAt = now ? new Date(now) : new Date();
        this.from = from;
        this.to = to;
        this.source = source;
        this.sum = sum.round2();

        const range = differenceInDays(this.to, this.from) + 1;
        this.sumPerDay = this.sum / range;
    }
}

/*////////////////// TEMP CODE!!! //////////////////*/
export enum Source {
    Salary = 1,
    Deposit = 2,
}
/*//////////////////////////////////////////////////*/
