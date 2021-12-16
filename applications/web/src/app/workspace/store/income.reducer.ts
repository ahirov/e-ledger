import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { IIncome } from "../model/income.model";
import * as fromActions from "./income.actions";

export interface State extends EntityState<IIncome> {}

const adapter: EntityAdapter<IIncome> = createEntityAdapter<IIncome>({
    selectId: (income: IIncome) => income.id,
    sortComparer: false,
});

const initialState = adapter.getInitialState({});

export const incomeReducer = createReducer(
    initialState,
    on(fromActions.addIncome, (state, { payload }) => {
        return adapter.addOne(payload, state);
    }),
    on(fromActions.addIncomes, (state, { payload }) => {
        return adapter.addMany(payload, state);
    }),
    on(fromActions.deleteIncome, (state, { payload }) => {
        return adapter.removeOne(payload, state);
    }),
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
    adapter.getSelectors();
