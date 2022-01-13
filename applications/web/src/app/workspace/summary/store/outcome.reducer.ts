import { createReducer, on } from "@ngrx/store";
import { OutcomeFilter } from "../model/outcome.model";
import { IOutcomeState } from "../model/state.model";
import * as fromActions from "./outcome.actions";
import * as _ from "lodash";

const initialState: IOutcomeState = {
    filter: new OutcomeFilter(),
    page: 0,
    ids: [],
};

export const outcomeReducer = createReducer(
    initialState,
    on(fromActions.addOutcome, (state, { payload }): IOutcomeState => {
        const ids = [...state.ids];
        if (state.filter.process(payload)) {
            ids.unshift(payload.id);
        }
        return { ...state, ids: ids };
    }),
    on(fromActions.deleteOutcome, (state, { payload }): IOutcomeState => {
        return {
            ...state,
            ids: _.filter(state.ids, item => item !== payload),
        };
    }),
    on(fromActions.setFilter, (state, { payload }): IOutcomeState => {
        return { ...state, filter: payload };
    }),
    on(fromActions.setPage, (state, { payload }): IOutcomeState => {
        return { ...state, page: payload };
    }),
    on(fromActions.setOutput, (state, { payload }): IOutcomeState => {
        return { ...state, ids: [...payload] };
    }),
);
