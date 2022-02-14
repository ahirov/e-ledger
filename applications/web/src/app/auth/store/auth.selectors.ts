import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Feature } from "../../shared/store/app.model";
import { State } from "./auth.reducer";

const selector = createFeatureSelector<State>(Feature.Auth);
export const selectors = {
    user: createSelector(selector, state => state.user),
    error: createSelector(selector, state => state.error),
};
