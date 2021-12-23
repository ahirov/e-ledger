import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { IIncome, IIncomeFilter, IncomeFilter } from "../model/income.model";
import { IState } from "../model/state.model";

import * as fromActions from "./income.actions";

export interface State extends IState<IIncome> {
    filter: IIncomeFilter;
}

const adapter: EntityAdapter<IIncome> = createEntityAdapter<IIncome>({
    selectId: (income: IIncome) => income.id,
    sortComparer: false,
});

const initialState: State = adapter.getInitialState({
    activePage: 0,
    outputIds: [],
    filter: new IncomeFilter(),
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
