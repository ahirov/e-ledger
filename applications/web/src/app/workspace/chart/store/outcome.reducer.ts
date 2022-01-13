import { createReducer, on } from "@ngrx/store";
import { IOutcomeState } from "../chart.model";
import * as fromActions from "./outcome.actions";

const initialState: IOutcomeState = {
    year: null,
    points: [],
    sections: [],
};

export const outcomeReducer = createReducer(
    initialState,
    on(fromActions.setYear, (state, { payload }): IOutcomeState => {
        return { ...state, year: payload };
    }),
    on(fromActions.setPoints, (state, { payload }): IOutcomeState => {
        return { ...state, points: [...payload] };
    }),
    on(fromActions.setSections, (state, { payload }): IOutcomeState => {
        return { ...state, sections: [...payload] };
    }),
);
