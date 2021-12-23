import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { IOutcome, IOutcomeFilter, OutcomeFilter } from "../model/outcome.model";
import { IState } from "../model/state.model";

import * as fromActions from "./outcome.actions";

export interface State extends IState<IOutcome> {
    filter: IOutcomeFilter;
}

const adapter: EntityAdapter<IOutcome> = createEntityAdapter<IOutcome>({
    selectId: (outcome: IOutcome) => outcome.id,
    sortComparer: false,
});

const initialState: State = adapter.getInitialState({
    activePage: 0,
    outputIds: [],
    filter: new OutcomeFilter(),
});

export const outcomeReducer = createReducer(
    initialState,
    on(fromActions.addOutcome, (state, { payload }): State => {
        return adapter.addOne(payload, state);
    }),
    on(fromActions.addOutcomes, (state, { payload }): State => {
        return adapter.addMany(payload, state);
    }),
    on(fromActions.deleteOutcome, (state, { payload }): State => {
        return adapter.removeOne(payload, state);
    }),
    on(fromActions.setPage, (state, { payload }): State => {
        return { ...state, activePage: payload };
    }),
    on(fromActions.setFilter, (state, { payload }): State => {
        return { ...state, filter: payload };
    }),
    on(fromActions.setOutput, (state, { payload }): State => {
        return { ...state, outputIds: payload };
    }),
);
