import { createAction, props } from "@ngrx/store";
import { IIncome } from "../model/income.model";

export const ADD_INCOME    = "[Income] Add income";
export const ADD_INCOMES   = "[Income] Add incomes";
export const DELETE_INCOME = "[Income] Delete income";
export const SELECT_PAGE   = "[Income] Select page";

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
