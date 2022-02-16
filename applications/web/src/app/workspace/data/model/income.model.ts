import { v4 as uuid } from "uuid";
import { differenceInDays } from "date-fns";
import { IEntity } from "./state.model";
import { ISource } from "../../adjustment/model/income.model";
import { environment } from "applications/web/src/environments/environment";

interface IIncomeCommon extends IEntity {
    readonly from: Date;
    readonly to: Date;
    readonly sum: number;
    readonly sumPerDay: number;
}

export interface IIncomeData extends IIncomeCommon {
    readonly sourceId: number;
}

export interface IIncome extends IIncomeCommon {
    readonly source: ISource;
}

export class IncomeData implements IIncomeData {
    public readonly id: string;
    public readonly created: Date;

    public readonly from: Date;
    public readonly to: Date;
    public readonly sum: number;
    public readonly sumPerDay: number;
    public readonly sourceId: number;

    constructor(
        from: Date,
        to: Date,
        sum: number,
        sourceId: number,
        now?: number,
    ) {
        this.id = uuid();
        this.created = now ? new Date(now) : new Date();
        this.from = from;
        this.to = to;
        this.sourceId = sourceId;

        const sumValue = sum.round2();
        this.sum = sumValue <= environment.sumMaxValue ? sumValue : 0;

        const range = differenceInDays(this.to, this.from) + 1;
        this.sumPerDay = this.sum / range;
    }
}

export class Income implements IIncome {
    constructor(
        public readonly id: string,
        public readonly created: Date,
        public readonly from: Date,
        public readonly to: Date,
        public readonly sum: number,
        public readonly sumPerDay: number,
        public readonly source: ISource,
    ) {}
}
