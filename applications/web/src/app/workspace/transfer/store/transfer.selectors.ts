import { createSelector } from "@ngrx/store";
import { selectors as dataSelectors } from "../../data/store/state.selectors";
import { selectors as enumSelectors } from "../../adjustment/store/adjustment.selectors";

export const selectors = {
    income: createSelector(
        dataSelectors.income.items,
        enumSelectors.sources,
        (items, sources) => {
            return { items, list: sources };
        },
    ),
    outcome: createSelector(
        dataSelectors.outcome.items,
        enumSelectors.categories,
        (items, categories) => {
            return { items, list: categories };
        },
    ),
};
