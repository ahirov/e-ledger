import { createAction, props } from "@ngrx/store";
import { ISource } from "../model/income.model";
import { ICategory } from "../model/outcome.model";

export const REFRESH = "[Adjustment] Refresh";
export const SAVE    = "[Adjustment] Save";

export const refresh = createAction(REFRESH);
export const save = createAction(
    SAVE,
    props<{ payload: { sources: ISource[]; categories: ICategory[] } }>(),
);
