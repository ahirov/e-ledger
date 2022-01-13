import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { IOutcome } from "../model/outcome.model";
import { IOutcomeState } from "../model/state.model";
import * as fromActions from "./outcome.actions";

const adapter: EntityAdapter<IOutcome> = createEntityAdapter<IOutcome>({
    selectId: (outcome: IOutcome) => outcome.id,
    sortComparer: false,
});

const initialState: IOutcomeState = adapter.getInitialState({
    years: [],
});

export const outcomeReducer = createReducer(
    initialState,
    on(fromActions.addOutcome, (state, { payload }): IOutcomeState => {
        return adapter.addOne<IOutcomeState>(payload, state);
    }),
    on(fromActions.addOutcomes, (state, { payload }): IOutcomeState => {
        return adapter.addMany<IOutcomeState>(payload, state);
    }),
    on(fromActions.deleteOutcome, (state, { payload }): IOutcomeState => {
        return adapter.removeOne<IOutcomeState>(payload, state);
    }),
    on(fromActions.setYears, (state, { payload }): IOutcomeState => {
        return { ...state, years: [...payload] };
    }),
);
