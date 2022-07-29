import { IAuthState } from "../model/state.model";
import * as fromActions from "./auth.actions";

const initialState: IAuthState = { user: null, error: null };

export function authReducer(
    state = initialState,
    action: fromActions.AuthAction,
): IAuthState {
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
        case fromActions.CLEAR:
            return {
                user: null,
                error: null,
            };
        default:
            return state;
    }
}
