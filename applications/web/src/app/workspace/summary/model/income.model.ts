import { IIncome, Source } from "../../data/model/income.model";
import { IEntityFilter } from "../../data/model/state.model";

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
