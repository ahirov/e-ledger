import { ISource } from "./income.model";
import { ICategory } from "./outcome.model";

export enum SyncMode {
    Never = 1,
    OneMinute = 2,
    FiveMinutes = 3,
}

export interface IAdjustmentState {
    sources: ISource[];
    categories: ICategory[];
}
