import { ActionReducerMap } from "@ngrx/store";
import { IDataState } from "../model/state.model";
import { incomeReducer } from "./income.reducer";
import { outcomeReducer } from "./outcome.reducer";

export const workspaceReducer: ActionReducerMap<IDataState> = {
    income: incomeReducer,
    outcome: outcomeReducer,
};
