import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { IIncome } from "../model/income.model";
import { IState } from "../model/state.model";

import * as fromActions from "./income.actions";
import * as fromReducer from "./state.reducer";

export interface State extends IState<IIncome> {}

const adapter: EntityAdapter<IIncome> = createEntityAdapter<IIncome>({
    selectId: (income: IIncome) => income.id,
    sortComparer: false,
});

const initialState: State = adapter.getInitialState({
    activePage: 0,
});

export const incomeReducer = createReducer(
    initialState,
    on(fromActions.addIncome, (state, { payload }): State => {
        return adapter.addOne(payload, state);
    }),
    on(fromActions.addIncomes, (state, { payload }): State => {
        return adapter.addMany(payload, state);
    }),
    on(fromActions.deleteIncome, (state, { payload }): State => {
        return adapter.removeOne(payload, state);
    }),
    on(fromActions.selectPage, (state, { payload }): State => {
        return {
            ...state,
            activePage: fromReducer.getActivePage(payload, state),
        };
    }),
);
