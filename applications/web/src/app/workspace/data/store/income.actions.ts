import { createAction, props } from "@ngrx/store";
import { IIncomeData } from "../model/income.model";

export const ADD_INCOME     = "[Workspace][Income] Add income";
export const ADD_INCOMES    = "[Workspace][Income] Add incomes";
export const DELETE_INCOME  = "[Workspace][Income] Delete income";
export const DELETE_INCOMES = "[Workspace][Income] Delete incomes";
export const PROCESS_YEARS  = "[Workspace][Income] Process years";
export const SET_YEARS      = "[Workspace][Income] Set years";

export const addIncome = createAction(
    ADD_INCOME,
    props<{ payload: IIncomeData }>(),
);
export const addIncomes = createAction(
    ADD_INCOMES,
    props<{ payload: IIncomeData[] }>(),
);
export const deleteIncome = createAction(
    DELETE_INCOME,
    props<{ payload: string }>(),
);
export const deleteIncomes = createAction(
    DELETE_INCOMES,
    props<{ payload: string[] }>(),
);
export const processYears = createAction(
    PROCESS_YEARS,
    props<{ payload: IIncomeData[] }>(),
);
export const setYears = createAction(SET_YEARS, props<{ payload: number[] }>());
