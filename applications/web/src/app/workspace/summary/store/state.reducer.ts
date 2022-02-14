import { ActionReducerMap } from "@ngrx/store";
import { ISummaryState } from "../model/state.model";
import { incomeReducer } from "./income.reducer";
import { outcomeReducer } from "./outcome.reducer";

export const summaryReducer: ActionReducerMap<ISummaryState> = {
    income: incomeReducer,
    outcome: outcomeReducer,
};
