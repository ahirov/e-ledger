import { createAction, props } from "@ngrx/store";
import { ISource } from "../model/income.model";
import { ICategory } from "../model/outcome.model";

export const REFRESH        = "[Adjustment] Refresh";
export const SET_SOURCES    = "[Adjustment] Set sources";
export const SET_CATEGORIES = "[Adjustment] Set categories";

export const refresh = createAction(REFRESH);
export const setSources = createAction(
    SET_SOURCES,
    props<{ payload: ISource[] }>(),
);
export const setCategories = createAction(
    SET_CATEGORIES,
    props<{ payload: ICategory[] }>(),
);
