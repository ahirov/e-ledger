import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Feature } from "../../../shared/store/app.model";
import { IAdjustmentState } from "../model/state.mode";

const selector = createFeatureSelector<IAdjustmentState>(Feature.Adjustment);
export const selectors = {
    sources: createSelector(selector, state => state.sources),
    categories: createSelector(selector, state => state.categories),
};
