import { IIncome, Source } from "../../data/model/income.model";
import { IEntityFilter } from "../../data/model/state.model";

export interface IIncomeFilter extends IEntityFilter {
    from: Date | null;
    to: Date | null;
    source: Source | null;
}

export class IncomeFilter implements IIncomeFilter {
    constructor(
        public from: Date | null = null,
        public to: Date | null = null,
        public source: Source | null = null,
    ) {}

    public any(): boolean {
        return this.from || this.to || this.source ? true : false;
    }

    public process(item: IIncome): boolean {
        const isFrom = this.from === null || this.from <= item.to;
        const isTo = this.to === null || this.to >= item.from;
        const isSource = this.source === null || this.source === item.source;

        return isFrom && isTo && isSource;
    }
}
