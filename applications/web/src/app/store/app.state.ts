import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from "@ngrx/store";

import { AppSelector, AppState } from "./app.model";
import { IIncome, IIncomeFilter } from "../workspace/model/income.model";
import { IOutcome, IOutcomeFilter } from "../workspace/model/outcome.model";
import { AuthEffects } from "../auth/store/auth.effects";
import { IncomeEffects } from "../workspace/store/income.effects";
import { OutcomeEffects } from "../workspace/store/outcome.effects";
import { selectors } from "../workspace/store/state.selectors";
import { selectors as incomeSelectors } from "../workspace/store/income.selectors";
import { selectors as outcomeSelectors } from "../workspace/store/outcome.selectors";

import * as fromAuth from "../auth/store/auth.reducer";
import * as fromIncome from "../workspace/store/income.reducer";
import * as fromOutcome from "../workspace/store/outcome.reducer";

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    income: fromIncome.incomeReducer,
    outcome: fromOutcome.outcomeReducer,
};

export const appEffects = [AuthEffects, IncomeEffects, OutcomeEffects];

const selectIncomeState = createFeatureSelector<fromIncome.State>("income");
const selectOutcomeState = createFeatureSelector<fromOutcome.State>("outcome");
export const appSelectors: {
    income: AppSelector<IIncome, IIncomeFilter>;
    outcome: AppSelector<IOutcome, IOutcomeFilter>;
} = {
    income: {
        items:             createSelector(selectIncomeState, selectors.items),
        previewItems:      createSelector(selectIncomeState, selectors.previewItems),
        summaryActivePage: createSelector(selectIncomeState, selectors.summaryActivePage),
        summaryPagesCount: createSelector(selectIncomeState, selectors.summaryPagesCount),
        summaryPageItems:  createSelector(selectIncomeState, selectors.summaryPageItems),
        summaryItemsCount: createSelector(selectIncomeState, selectors.summaryItemsCount),
        summaryFilter:     createSelector(selectIncomeState, selectors.summaryFilter),
        chartYear:         createSelector(selectIncomeState, selectors.chartYear),
        chartYears:        createSelector(selectIncomeState, selectors.chartYears),
        chartPoints:       createSelector(selectIncomeState, incomeSelectors.chartPoints),
        chartSections:     createSelector(selectIncomeState, incomeSelectors.chartSections),
    },
    outcome: {
        items:             createSelector(selectOutcomeState, selectors.items),
        previewItems:      createSelector(selectOutcomeState, selectors.previewItems),
        summaryActivePage: createSelector(selectOutcomeState, selectors.summaryActivePage),
        summaryPagesCount: createSelector(selectOutcomeState, selectors.summaryPagesCount),
        summaryPageItems:  createSelector(selectOutcomeState, selectors.summaryPageItems),
        summaryItemsCount: createSelector(selectOutcomeState, selectors.summaryItemsCount),
        summaryFilter:     createSelector(selectOutcomeState, selectors.summaryFilter),
        chartYear:         createSelector(selectOutcomeState, selectors.chartYear),
        chartYears:        createSelector(selectOutcomeState, selectors.chartYears),
        chartPoints:       createSelector(selectOutcomeState, outcomeSelectors.chartPoints),
        chartSections:     createSelector(selectOutcomeState, outcomeSelectors.chartSections),
    },
};
