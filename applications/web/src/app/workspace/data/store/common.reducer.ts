import { createReducer, on } from "@ngrx/store";
import { ICommonState } from "../model/state.model";
import * as fromActions from "./common.actions";

const initialState: ICommonState = {
    isUnsaved: false,
};

export const commonReducer = createReducer(
    initialState,
    on(fromActions.setSaved, state => ({ ...state, isUnsaved: false })),
    on(fromActions.setUnsaved, state => ({ ...state, isUnsaved: true })),
);
