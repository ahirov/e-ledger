import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Feature } from "../../../shared/store/app.model";
import { ISummaryState } from "../model/state.model";
import { IDataState } from "../../data/model/state.model";
import { IAdjustmentState } from "../../adjustment/model/state.mode";

import { getIncomes, getOutcomes } from "../../data/store/state.functions";
import { environment } from "applications/web/src/environments/environment";
import * as _ from "lodash";

const itemsPerPage = environment.pageItemsCount;
const data       = createFeatureSelector<IDataState>(Feature.Data);
const summary    = createFeatureSelector<ISummaryState>(Feature.Summary);
const adjustment = createFeatureSelector<IAdjustmentState>(Feature.Adjustment);
export const selectors = {
    income: {
        filter:     createSelector(summary, state => state.income.filter),
        itemsCount: createSelector(summary, state => state.income.ids.length),
        page:       createSelector(summary, state => state.income.page),
        pagesCount: createSelector(summary, state =>
            _.ceil(state.income.ids.length / itemsPerPage),
        ),
        pageItems: createSelector(
            summary,
            data,
            adjustment,
            (state, dataState, adjustmentState) =>
                getIncomes(
                    getPageIds(state.income.page, state.income.ids),
                    adjustmentState.sources,
                    dataState.income.entities,
                ),
        ),
    },
    outcome: {
        filter:     createSelector(summary, state => state.outcome.filter),
        itemsCount: createSelector(summary, state => state.outcome.ids.length),
        page:       createSelector(summary, state => state.outcome.page),
        pagesCount: createSelector(summary, state =>
            _.ceil(state.outcome.ids.length / itemsPerPage),
        ),
        pageItems: createSelector(
            summary,
            data,
            adjustment,
            (state, dataState, adjustmentState) =>
                getOutcomes(
                    getPageIds(state.outcome.page, state.outcome.ids),
                    adjustmentState.categories,
                    dataState.outcome.entities,
                ),
        ),
    },
};

function getPageIds(page: number, ids: string[]): string[] {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    return _.slice(ids, start, end);
}
