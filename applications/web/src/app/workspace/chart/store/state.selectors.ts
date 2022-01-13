import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureKey } from "../../../shared/store/app.model";
import { IState } from "../chart.model";

const selector = createFeatureSelector<IState>(FeatureKey.Chart);
export const selectors = {
    income: {
        year: createSelector(selector, state => state.income.year),
        points: createSelector(selector, state => state.income.points),
        sections: createSelector(selector, state => state.income.sections),
    },
    outcome: {
        year: createSelector(selector, state => state.outcome.year),
        points: createSelector(selector, state => state.outcome.points),
        sections: createSelector(selector, state => state.outcome.sections),
    },
};
