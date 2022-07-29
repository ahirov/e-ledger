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
    on(
        fromActions.addOutcome,
        (state, { payload }): IOutcomeState => adapter.addOne(payload, state),
    ),
    on(
        fromActions.addOutcomes,
        (state, { payload }): IOutcomeState => adapter.addMany(payload, state),
    ),
    on(
        fromActions.deleteOutcome,
        (state, { payload }): IOutcomeState =>
            adapter.removeOne(payload, state),
    ),
    on(
        fromActions.deleteOutcomes,
        (state, { payload }): IOutcomeState =>
            adapter.removeMany(payload, state),
    ),
    on(
        fromActions.setYears,
        (state, { payload }): IOutcomeState => ({
            ...state,
            years: [...payload],
        }),
    ),
    on(
        fromActions.clear,
        (): IOutcomeState => ({ ids: [], entities: {}, years: [] }),
    ),
);
