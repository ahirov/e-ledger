import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Feature } from "../../shared/store/app.model";
import { IAuthState } from "../model/state.model";

const selector = createFeatureSelector<IAuthState>(Feature.Auth);
export const selectors = {
    user: createSelector(selector, state => state.user),
    error: createSelector(selector, state => state.error),
};
