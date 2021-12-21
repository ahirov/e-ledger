import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { IOutcome } from "../model/outcome.model";
import { IState } from "../model/state.model";

import * as fromActions from "./outcome.actions";
import * as fromReducer from "./state.reducer";

export interface State extends IState<IOutcome> {}

const adapter: EntityAdapter<IOutcome> = createEntityAdapter<IOutcome>({
    selectId: (outcome: IOutcome) => outcome.id,
    sortComparer: false,
});

const initialState: State = adapter.getInitialState({
    activePage: 0,
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
    on(fromActions.selectPage, (state, { payload }): State => {
        return {
            ...state,
            activePage: fromReducer.getActivePage(payload, state),
        };
    }),
);
