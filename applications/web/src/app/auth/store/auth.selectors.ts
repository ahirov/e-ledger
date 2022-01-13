import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureKey } from "../../shared/store/app.model";
import { State } from "./auth.reducer";

const selector = createFeatureSelector<State>(FeatureKey.Auth);
export const selectors = {
    user: createSelector(selector, state => state.user),
    error: createSelector(selector, state => state.error),
};
