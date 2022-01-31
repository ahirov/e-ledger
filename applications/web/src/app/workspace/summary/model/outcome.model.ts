import { Category, IOutcome } from "../../data/model/outcome.model";
import { IEntityFilter } from "../../data/model/state.model";

export interface IOutcomeFilter extends IEntityFilter {
    date: Date | null;
    category: Category | null;
    description: string | null;
}

export class OutcomeFilter implements IOutcomeFilter {
    constructor(
        public date: Date | null = null,
        public category: Category | null = null,
        public description: string | null = null,
    ) {}

    public any(): boolean {
        return this.date || this.category || this.description ? true : false;
    }

    public process(item: IOutcome): boolean {
        const isDate =
            this.date === null || this.date.getTime() === item.date.getTime();
        const isCategory =
            this.category === null || this.category === item.category;
        const isDescription =
            this.description === null ||
            (item.description !== null &&
                item.description?.indexOf(this.description) !== -1);

        return isDate && isCategory && isDescription;
    }
}
