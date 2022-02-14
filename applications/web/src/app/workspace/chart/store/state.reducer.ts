import { ActionReducerMap } from "@ngrx/store";
import { IChartState } from "../chart.model";
import { incomeReducer } from "./income.reducer";
import { outcomeReducer } from "./outcome.reducer";

export const chartReducer: ActionReducerMap<IChartState> = {
    income: incomeReducer,
    outcome: outcomeReducer,
};
