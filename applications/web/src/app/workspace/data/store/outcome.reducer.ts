import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { IOutcomeData } from "../model/outcome.model";
import { IOutcomeState } from "../model/state.model";
import * as fromActions from "./outcome.actions";

const adapter: EntityAdapter<IOutcomeData> = createEntityAdapter<IOutcomeData>({
    selectId: (outcome: IOutcomeData) => outcome.id,
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
    on(fromActions.deleteOutcomes, (state, { payload }): IOutcomeState => {
        return adapter.removeMany<IOutcomeState>(payload, state);
    }),
    on(fromActions.setYears, (state, { payload }): IOutcomeState => {
        return { ...state, years: [...payload] };
    }),
);
