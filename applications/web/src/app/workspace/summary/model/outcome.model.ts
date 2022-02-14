import { IOutcome, IOutcomeData } from "../../data/model/outcome.model";
import { IEntityFilter } from "../../data/model/state.model";

export interface IOutcomeFilter extends IEntityFilter {
    date: Date | null;
    categoryId: number | null;
    description: string | null;
}

export class OutcomeFilter implements IOutcomeFilter {
    constructor(
        public date: Date | null = null,
        public categoryId: number | null = null,
        public description: string | null = null,
    ) {}

    public any(): boolean {
        return this.date || this.categoryId || this.description ? true : false;
    }

    public process(item: IOutcome | IOutcomeData): boolean {
        const isDate =
            this.date === null || this.date.getTime() === item.date.getTime();
        const isCategory =
            this.categoryId === null || this.categoryId === this.getId(item);
        const isDescription =
            this.description === null ||
            (item.description !== null &&
                item.description?.indexOf(this.description) !== -1);

        return isDate && isCategory && isDescription;
    }

    private getId(item: IOutcome | IOutcomeData): number | null {
        if ("category" in item) {
            return item.category.id;
        }
        if ("categoryId" in item) {
            return item.categoryId;
        }
        return null;
    }
}
