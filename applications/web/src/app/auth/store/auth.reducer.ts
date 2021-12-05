import { AuthUser } from "../auth.model";
import * as fromActions from "./auth.actions";

export interface State {
    user: AuthUser | null;
    error: string | null;
}

const initialState: State = { user: null, error: null };

export function authReducer(
    state = initialState,
    action: fromActions.AuthAction,
): State {
    switch (action.type) {
        case fromActions.SIGNUP_START:
        case fromActions.LOGIN_START:
            return {
                ...state,
                error: null,
            };
        case fromActions.LOGIN_END:
            return {
                ...state,
                user: action.payload.user.copy(),
                error: null,
            };
        case fromActions.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                error: action.payload,
            };
        case fromActions.LOGOUT:
            return {
                ...state,
                user: null,
            };
        case fromActions.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
