import { Dictionary } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { environment } from "applications/web/src/environments/environment";
import { FeatureKey } from "../../../shared/store/app.model";
import { IState } from "../model/state.model";
import * as _ from "lodash";

const selector = createFeatureSelector<IState>(FeatureKey.Data);
export const selectors = {
    income: {
        years: createSelector(selector, state => state.income.years),
        items: createSelector(selector, state => state.income.entities),
        previewItems: createSelector(selector, state =>
            getItems(<string[]>state.income.ids, state.income.entities),
        ),
    },
    outcome: {
        years: createSelector(selector, state => state.outcome.years),
        items: createSelector(selector, state => state.outcome.entities),
        previewItems: createSelector(selector, state =>
            getItems(<string[]>state.outcome.ids, state.outcome.entities),
        ),
    },
};

function getItems<T>(ids: string[], items: Dictionary<T>): T[] {
    return _.map(
        _.takeRight(ids, environment.pagePreviewItemsCount),
        id => <T>items[id],
    );
}
