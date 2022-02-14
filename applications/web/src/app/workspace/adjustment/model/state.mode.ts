import { ISource } from "./income.model";
import { ICategory } from "./outcome.model";

export interface IAdjustmentState {
    sources: ISource[];
    categories: ICategory[];
}
