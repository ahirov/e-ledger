import { ActionReducerMap } from "@ngrx/store";
import { IState } from "../chart.model";
import { incomeReducer } from "./income.reducer";
import { outcomeReducer } from "./outcome.reducer";

export const chartReducer: ActionReducerMap<IState> = {
    income: incomeReducer,
    outcome: outcomeReducer,
};
