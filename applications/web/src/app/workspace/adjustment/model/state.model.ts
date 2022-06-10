import { ISource } from "./income.model";
import { ICategory } from "./outcome.model";

export enum SyncMode {
    Never = 0,
    OneMinute = 1,
    FiveMinutes = 2,
}

export enum DialogMode {
    None = 0,
    Saved = 1,
    ReAuth = 2,
}

export interface IAdjustmentState {
    readonly sources: ISource[];
    readonly categories: ICategory[];
    readonly error: string | null;
    readonly mode: DialogMode;
}
