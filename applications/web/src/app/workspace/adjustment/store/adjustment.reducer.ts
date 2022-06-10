import { createReducer, on } from "@ngrx/store";
import { DialogMode, IAdjustmentState } from "../model/state.model";
import * as fromActions from "./adjustment.actions";

const initialState: IAdjustmentState = {
    sources: [],
    categories: [],
    error: null,
    mode: DialogMode.None,
};

export const adjustmentReducer = createReducer(
    initialState,
    on(fromActions.saveEnums, (state, { payload }): IAdjustmentState => {
        return {
            ...state,
            sources: [...payload.sources],
            categories: [...payload.categories],
        };
    }),
    on(fromActions.refreshEnums, (state): IAdjustmentState => {
        return {
            ...state,
            sources: [...state.sources],
            categories: [...state.categories],
        };
    }),
    on(
        fromActions.saveSettings,
        fromActions.loginSettings,
        (state): IAdjustmentState => {
            return {
                ...state,
                error: null,
                mode: DialogMode.None,
            };
        },
    ),
    on(fromActions.setError, (state, { payload }): IAdjustmentState => {
        return {
            ...state,
            error: payload,
        };
    }),
    on(fromActions.setMode, (state, { payload }): IAdjustmentState => {
        return {
            ...state,
            mode: payload,
        };
    }),
);
