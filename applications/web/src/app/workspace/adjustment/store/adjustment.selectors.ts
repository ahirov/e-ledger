import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Feature } from "../../../shared/store/app.model";
import { IDataState } from "../../data/model/state.model";
import { IAdjustmentState } from "../model/state.model";

import { SourceView } from "../model/income.model";
import { CategoryView } from "../model/outcome.model";
import * as _ from "lodash";

const data = createFeatureSelector<IDataState>(Feature.Data);
const adjustment = createFeatureSelector<IAdjustmentState>(Feature.Adjustment);
export const selectors = {
    mode: createSelector(adjustment, state => state.mode),
    error: createSelector(adjustment, state => state.error),
    sources: createSelector(adjustment, state => state.sources),
    categories: createSelector(adjustment, state => state.categories),
    viewSources: createSelector(adjustment, data, (state, dataState) => {
        return _.map(
            state.sources,
            item =>
                new SourceView(
                    item.id,
                    item.name,
                    _.some(
                        dataState.income.entities,
                        entity => entity?.sourceId === item.id,
                    ),
                ),
        );
    }),
    viewCategories: createSelector(adjustment, data, (state, dataState) => {
        return _.map(
            state.categories,
            item =>
                new CategoryView(
                    item.id,
                    item.name,
                    _.some(
                        dataState.outcome.entities,
                        entity => entity?.categoryId === item.id,
                    ),
                ),
        );
    }),
};
