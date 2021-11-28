import { ActionReducerMap } from "@ngrx/store";

import { AuthEffects } from "../auth/store/auth.effects";
import * as fromAuth from "../auth/store/auth.reducer";

export interface AppState {
    auth: fromAuth.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
};

export const AppEffects = [AuthEffects];
