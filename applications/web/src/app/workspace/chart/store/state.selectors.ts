import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Feature } from "../../../shared/store/app.model";
import { IChartState } from "../chart.model";

const chart = createFeatureSelector<IChartState>(Feature.Chart);
export const selectors = {
    income: {
        year:     createSelector(chart, state => state.income.year),
        points:   createSelector(chart, state => state.income.points),
        sections: createSelector(chart, state => state.income.sections),
    },
    outcome: {
        year:     createSelector(chart, state => state.outcome.year),
        points:   createSelector(chart, state => state.outcome.points),
        sections: createSelector(chart, state => state.outcome.sections),
    },
};
