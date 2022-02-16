import { createReducer, on } from "@ngrx/store";
import { IAdjustmentState } from "../model/state.mode";
import * as fromActions from "./adjustment.actions";

const initialState: IAdjustmentState = {
    sources: [],
    categories: [],
};

export const adjustmentReducer = createReducer(
    initialState,
    on(fromActions.refresh, (state): IAdjustmentState => {
        return {
            ...state,
            sources: [...state.sources],
            categories: [...state.categories],
        };
    }),
    on(fromActions.save, (state, { payload }): IAdjustmentState => {
        return {
            ...state,
            sources: [...payload.sources],
            categories: [...payload.categories],
        };
    }),
);
