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
    on(
        fromActions.saveEnums,
        (state, { payload }): IAdjustmentState => ({
            ...state,
            sources: [...payload.sources],
            categories: [...payload.categories],
        }),
    ),
    on(
        fromActions.refreshEnums,
        (state): IAdjustmentState => ({
            ...state,
            sources: [...state.sources],
            categories: [...state.categories],
        }),
    ),
    on(
        fromActions.saveSettings,
        fromActions.loginSettings,
        (state): IAdjustmentState => ({
            ...state,
            error: null,
            mode: DialogMode.None,
        }),
    ),
    on(
        fromActions.setError,
        (state, { payload }): IAdjustmentState => ({
            ...state,
            error: payload,
        }),
    ),
    on(
        fromActions.setMode,
        (state, { payload }): IAdjustmentState => ({ ...state, mode: payload }),
    ),
    on(
        fromActions.clear,
        (): IAdjustmentState => ({
            sources: [],
            categories: [],
            error: null,
            mode: DialogMode.None,
        }),
    ),
);
