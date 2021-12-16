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
    private _startedAt!: Date;
    private _endedAt!: Date;

    public readonly id: string;
    public readonly createdAt: Date;
    public source: Source;
    public sum: number;

    public get startedAt(): Date {
        return this._startedAt;
    }
    public set startedAt(value: Date) {
        this._startedAt = value.toDate();
    }
    public get endedAt(): Date {
        return this._endedAt;
    }
    public set endedAt(value: Date) {
        this._endedAt = value.toDate();
    }

    constructor(startedAt: Date, endedAt: Date, source: Source, sum: number) {
        this.id = uuid();
        this.createdAt = new Date();
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.source = source;
        this.sum = sum.round2();
    }
}

/*////////////////// TEMP CODE!!! //////////////////*/
export enum Source {
    Salary = 1,
    Deposit = 2,
}
/*//////////////////////////////////////////////////*/
