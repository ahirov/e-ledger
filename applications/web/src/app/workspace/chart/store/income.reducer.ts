import { createReducer, on } from "@ngrx/store";
import { IIncomeState } from "../chart.model";
import * as fromActions from "./income.actions";

const initialState: IIncomeState = {
    year: null,
    points: [],
    sections: [],
};

export const incomeReducer = createReducer(
    initialState,
    on(fromActions.setYear, (state, { payload }): IIncomeState => {
        return { ...state, year: payload };
    }),
    on(fromActions.setPoints, (state, { payload }): IIncomeState => {
        return { ...state, points: [...payload] };
    }),
    on(fromActions.setSections, (state, { payload }): IIncomeState => {
        return { ...state, sections: [...payload] };
    }),
);
