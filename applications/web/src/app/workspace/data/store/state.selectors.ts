import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Feature } from "../../../shared/store/app.model";
import { IDataState } from "../model/state.model";
import { IAdjustmentState } from "../../adjustment/model/state.model";

import { environment } from "applications/web/src/environments/environment";
import { getIncomes, getOutcomes } from "./state.functions";
import * as _ from "lodash";

const data = createFeatureSelector<IDataState>(Feature.Data);
const adjustment = createFeatureSelector<IAdjustmentState>(Feature.Adjustment);
export const selectors = {
    income: {
        years: createSelector(data, state => state.income.years),
        items: createSelector(data, adjustment, (state, adjustmentState) =>
            getIncomes(
                <string[]>state.income.ids,
                adjustmentState.sources,
                state.income.entities,
            ),
        ),
        previewItems: createSelector(
            data,
            adjustment,
            (state, adjustmentState) =>
                getIncomes(
                    getPreviewIds(<string[]>state.income.ids),
                    adjustmentState.sources,
                    state.income.entities,
                ),
        ),
    },
    outcome: {
        years: createSelector(data, state => state.outcome.years),
        items: createSelector(data, adjustment, (state, adjustmentState) =>
            getOutcomes(
                <string[]>state.outcome.ids,
                adjustmentState.categories,
                state.outcome.entities,
            ),
        ),
        previewItems: createSelector(
            data,
            adjustment,
            (state, adjustmentState) =>
                getOutcomes(
                    getPreviewIds(<string[]>state.outcome.ids),
                    adjustmentState.categories,
                    state.outcome.entities,
                ),
        ),
    },
};

function getPreviewIds(ids: string[]): string[] {
    return _.takeRight(ids, environment.pagePreviewItemsCount);
}
