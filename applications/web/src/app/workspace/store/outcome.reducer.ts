import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { IOutcome } from "../model/outcome.model";
import * as fromActions from "./outcome.actions";

export interface State extends EntityState<IOutcome> {}

const adapter: EntityAdapter<IOutcome> = createEntityAdapter<IOutcome>({
    selectId: (outcome: IOutcome) => outcome.id,
    sortComparer: false,
});

const initialState = adapter.getInitialState({});

export const outcomeReducer = createReducer(
    initialState,
    on(fromActions.addOutcome, (state, { payload }) => {
        return adapter.addOne(payload, state);
    }),
    on(fromActions.addOutcomes, (state, { payload }) => {
        return adapter.addMany(payload, state);
    }),
    on(fromActions.deleteOutcome, (state, { payload }) => {
        return adapter.removeOne(payload, state);
    }),
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
    adapter.getSelectors();
