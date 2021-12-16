import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from "@ngrx/store";

import { AuthEffects } from "../auth/store/auth.effects";

import * as fromAuth from "../auth/store/auth.reducer";
import * as fromIncome from "../workspace/store/income.reducer";
import * as fromOutcome from "../workspace/store/outcome.reducer";

export interface AppState {
    auth: fromAuth.State;
    income: fromIncome.State;
    outcome: fromOutcome.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    income: fromIncome.incomeReducer,
    outcome: fromOutcome.outcomeReducer,
};

export const appEffects = [AuthEffects];

const selectIncomeState = createFeatureSelector<fromIncome.State>("income");
const selectOutcomeState = createFeatureSelector<fromOutcome.State>("outcome");
export const appSelectors = {
    income: {
        ids:      createSelector(selectIncomeState, fromIncome.selectIds),
        entities: createSelector(selectIncomeState, fromIncome.selectEntities),
        all:      createSelector(selectIncomeState, fromIncome.selectAll),
        total:    createSelector(selectIncomeState, fromIncome.selectTotal),
    },
    outcome: {
        ids:      createSelector(selectOutcomeState, fromOutcome.selectIds),
        entities: createSelector(selectOutcomeState, fromOutcome.selectEntities),
        all:      createSelector(selectOutcomeState, fromOutcome.selectAll),
        total:    createSelector(selectOutcomeState, fromOutcome.selectTotal),
    },
};
