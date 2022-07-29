import { createReducer, on } from "@ngrx/store";
import { IIncomeState } from "../model/state.model";
import * as fromActions from "./income.actions";

const initialState: IIncomeState = {
    year: null,
    points: [],
    sections: [],
};

export const incomeReducer = createReducer(
    initialState,
    on(
        fromActions.setYear,
        (state, { payload }): IIncomeState => ({ ...state, year: payload }),
    ),
    on(
        fromActions.setPoints,
        (state, { payload }): IIncomeState => ({
            ...state,
            points: [...payload],
        }),
    ),
    on(
        fromActions.setSections,
        (state, { payload }): IIncomeState => ({
            ...state,
            sections: [...payload],
        }),
    ),
    on(
        fromActions.clear,
        (): IIncomeState => ({ year: null, points: [], sections: [] }),
    ),
);
