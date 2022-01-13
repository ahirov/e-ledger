import { createAction, props } from "@ngrx/store";
import { IIncome } from "../../data/model/income.model";
import { IIncomeFilter } from "../model/income.model";

export const ADD_INCOME     = "[Summary][Income] Add income";
export const DELETE_INCOME  = "[Summary][Income] Delete income";
export const SET_FILTER     = "[Summary][Income] Set filter";
export const SELECT_PAGE    = "[Summary][Income] Select page";
export const PROCESS_PAGE   = "[Summary][Income] Process page";
export const SET_PAGE       = "[Summary][Income] Set page";
export const SET_OUTPUT     = "[Summary][Income] Set output";
export const PROCESS_OUTPUT = "[Summary][Income] Process output";

export const addIncome = createAction(
    ADD_INCOME,
    props<{ payload: IIncome }>(),
);
export const deleteIncome = createAction(
    DELETE_INCOME,
    props<{ payload: string }>(),
);
export const setFilter = createAction(
    SET_FILTER,
    props<{ payload: IIncomeFilter }>(),
);
export const selectPage = createAction(
    SELECT_PAGE,
    props<{ payload: number }>(),
);
export const processPage = createAction(PROCESS_PAGE);
export const setPage = createAction(
    SET_PAGE,
    props<{ payload: number }>()
);
export const setOutput = createAction(
    SET_OUTPUT,
    props<{ payload: string[] }>(),
);
export const processOutput = createAction(PROCESS_OUTPUT);
