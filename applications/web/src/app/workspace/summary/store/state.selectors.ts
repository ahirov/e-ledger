import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Dictionary } from "@ngrx/entity";

import { FeatureKey } from "../../../shared/store/app.model";
import { IState as DataState } from "../../data/model/state.model";
import { IState } from "../model/state.model";
import { environment } from "applications/web/src/environments/environment";
import * as _ from "lodash";

const itemsPerPage = environment.pageItemsCount;
const dataSelector = createFeatureSelector<DataState>(FeatureKey.Data);
const summarySelector = createFeatureSelector<IState>(FeatureKey.Summary);
export const selectors = {
    income: {
        filter: createSelector(summarySelector, state => state.income.filter),
        itemsCount: createSelector(
            summarySelector,
            state => state.income.ids.length,
        ),
        page: createSelector(summarySelector, state => state.income.page),
        pagesCount: createSelector(summarySelector, state =>
            _.ceil(state.income.ids.length / itemsPerPage),
        ),
        pageItems: createSelector(
            dataSelector,
            summarySelector,
            (dataState, summaryState) =>
                getPageItems(
                    summaryState.income.page,
                    summaryState.income.ids,
                    dataState.income.entities,
                ),
        ),
    },
    outcome: {
        filter: createSelector(summarySelector, state => state.outcome.filter),
        itemsCount: createSelector(
            summarySelector,
            state => state.outcome.ids.length,
        ),
        page: createSelector(summarySelector, state => state.outcome.page),
        pagesCount: createSelector(summarySelector, state =>
            _.ceil(state.outcome.ids.length / itemsPerPage),
        ),
        pageItems: createSelector(
            dataSelector,
            summarySelector,
            (dataState, summaryState) =>
                getPageItems(
                    summaryState.outcome.page,
                    summaryState.outcome.ids,
                    dataState.outcome.entities,
                ),
        ),
    },
};

function getPageItems<T>(page: number, ids: string[], items: Dictionary<T>): T[] {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    return _.map(_.slice(ids, start, end), id => <T>items[id]);
}
