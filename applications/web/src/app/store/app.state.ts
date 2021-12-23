import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from "@ngrx/store";

import { AuthEffects } from "../auth/store/auth.effects";
import { IncomeEffects } from "../workspace/store/income.effects";
import { OutcomeEffects } from "../workspace/store/outcome.effects";
import { IIncomeFilter } from "../workspace/model/income.model";
import { IOutcomeFilter } from "../workspace/model/outcome.model";
import { selectors } from "../workspace/store/state.selectors";

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

export const appEffects = [AuthEffects, IncomeEffects, OutcomeEffects];

const selectIncomeState = createFeatureSelector<fromIncome.State>("income");
const selectOutcomeState = createFeatureSelector<fromOutcome.State>("outcome");
export const appSelectors = {
    income: {
        items:        createSelector(selectIncomeState, selectors.items),
        activePage:   createSelector(selectIncomeState, selectors.activePage),
        pagesCount:   createSelector(selectIncomeState, selectors.pagesCount),
        pageItems:    createSelector(selectIncomeState, selectors.pageItems),
        previewItems: createSelector(selectIncomeState, selectors.previewItems),
        outputCount:  createSelector(selectIncomeState, selectors.outputCount),
        filter: createSelector(
            selectIncomeState,
            (state: fromIncome.State): IIncomeFilter => state.filter,
        ),
    },
    outcome: {
        items:        createSelector(selectOutcomeState, selectors.items),
        activePage:   createSelector(selectOutcomeState, selectors.activePage),
        pagesCount:   createSelector(selectOutcomeState, selectors.pagesCount),
        pageItems:    createSelector(selectOutcomeState, selectors.pageItems),
        previewItems: createSelector(selectOutcomeState, selectors.previewItems),
        outputCount:  createSelector(selectOutcomeState, selectors.outputCount),
        filter: createSelector(
            selectOutcomeState,
            (state: fromOutcome.State): IOutcomeFilter => state.filter,
        ),
    },
};
