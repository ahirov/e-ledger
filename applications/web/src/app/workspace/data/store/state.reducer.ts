import { ActionReducerMap } from "@ngrx/store";
import { IDataState } from "../model/state.model";
import { commonReducer } from "./common.reducer";
import { incomeReducer } from "./income.reducer";
import { outcomeReducer } from "./outcome.reducer";

export const dataReducer: ActionReducerMap<IDataState> = {
    common: commonReducer,
    income: incomeReducer,
    outcome: outcomeReducer,
};
