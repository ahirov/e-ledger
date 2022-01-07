import { createAction, props } from "@ngrx/store";
import { IIncome, IIncomeFilter } from "../model/income.model";

export const ADD_INCOME     = "[Income] Add income";
export const ADD_INCOMES    = "[Income] Add incomes";
export const DELETE_INCOME  = "[Income] Delete income";
export const SELECT_PAGE    = "[Income] Select page";
export const PROCESS_PAGE   = "[Income] Process page";
export const SET_PAGE       = "[Income] Set page";
export const SET_YEAR       = "[Income] Set year";
export const SET_FILTER     = "[Income] Set filter";
export const SET_OUTPUT     = "[Income] Set output";
export const PROCESS_OUTPUT = "[Income] Process output";

export const addIncome = createAction(
    ADD_INCOME,
    props<{ payload: IIncome }>(),
);
export const addIncomes = createAction(
    ADD_INCOMES,
    props<{ payload: IIncome[] }>(),
);
export const deleteIncome = createAction(
    DELETE_INCOME,
    props<{ payload: string }>(),
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
export const setYear = createAction(
    SET_YEAR,
    props<{ payload: number | null }>()
);
export const setFilter = createAction(
    SET_FILTER,
    props<{ payload: IIncomeFilter }>(),
);
export const setOutput = createAction(
    SET_OUTPUT,
    props<{ payload: string[] }>(),
);
export const processOutput = createAction(PROCESS_OUTPUT);
