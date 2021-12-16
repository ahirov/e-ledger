import { createAction, props } from "@ngrx/store";
import { IIncome } from "../model/income.model";

const ADD_INCOME    = "[Income] Add income";
const ADD_INCOMES   = "[Income] Add incomes";
const DELETE_INCOME = "[Income] Delete income";

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
