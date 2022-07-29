import { createReducer, on } from "@ngrx/store";
import { IOutcomeState } from "../model/state.model";
import * as fromActions from "./outcome.actions";

const initialState: IOutcomeState = {
    year: null,
    points: [],
    sections: [],
};

export const outcomeReducer = createReducer(
    initialState,
    on(
        fromActions.setYear,
        (state, { payload }): IOutcomeState => ({ ...state, year: payload }),
    ),
    on(
        fromActions.setPoints,
        (state, { payload }): IOutcomeState => ({
            ...state,
            points: [...payload],
        }),
    ),
    on(
        fromActions.setSections,
        (state, { payload }): IOutcomeState => ({
            ...state,
            sections: [...payload],
        }),
    ),
    on(
        fromActions.clear,
        (): IOutcomeState => ({ year: null, points: [], sections: [] }),
    ),
);
