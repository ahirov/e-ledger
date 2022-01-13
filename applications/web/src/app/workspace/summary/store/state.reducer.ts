import { ActionReducerMap } from "@ngrx/store";
import { IState } from "../model/state.model";
import { incomeReducer } from "./income.reducer";
import { outcomeReducer } from "./outcome.reducer";

export const summaryReducer: ActionReducerMap<IState> = {
    income: incomeReducer,
    outcome: outcomeReducer,
};
