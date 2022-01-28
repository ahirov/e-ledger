import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { IIncome } from "../model/income.model";
import { IIncomeState } from "../model/state.model";
import * as fromActions from "./income.actions";

const adapter: EntityAdapter<IIncome> = createEntityAdapter<IIncome>({
    selectId: (income: IIncome) => income.id,
    sortComparer: false,
});

const initialState: IIncomeState = adapter.getInitialState({
    years: [],
});

export const incomeReducer = createReducer(
    initialState,
    on(fromActions.addIncome, (state, { payload }): IIncomeState => {
        return adapter.addOne<IIncomeState>(payload, state);
    }),
    on(fromActions.addIncomes, (state, { payload }): IIncomeState => {
        return adapter.addMany<IIncomeState>(payload, state);
    }),
    on(fromActions.deleteIncome, (state, { payload }): IIncomeState => {
        return adapter.removeOne<IIncomeState>(payload, state);
    }),
    on(fromActions.deleteIncomes, (state, { payload }): IIncomeState => {
        return adapter.removeMany<IIncomeState>(payload, state);
    }),
    on(fromActions.setYears, (state, { payload }): IIncomeState => {
        return { ...state, years: [...payload] };
    }),
);
