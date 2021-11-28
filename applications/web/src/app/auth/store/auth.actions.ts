import { Action } from "@ngrx/store";

import { AuthUser, AuthCredentials } from "../auth.model";
import { UndefinedAction } from "../../store/undefined.action";

export const SIGNUP_START = "[Auth] Signup start";
export const LOGIN_START  = "[Auth] Login start";
export const LOGIN_END    = "[Auth] Login end";
export const LOGIN_FAIL   = "[Auth] Login fail";
export const LOGIN_AUTO   = "[Auth] Login auto";
export const LOGOUT       = "[Auth] Logout";
export const CLEAR_ERROR  = "[Auth] Clear error";

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: AuthCredentials) {}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: AuthCredentials) {}
}

export class LoginEnd implements Action {
    readonly type = LOGIN_END;

    constructor(public payload: { user: AuthUser; redirect: boolean }) {}
}
export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: string) {}
}

export class LoginAuto implements Action {
    readonly type = LOGIN_AUTO;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export type AuthAction =
    | SignupStart
    | LoginStart
    | LoginEnd
    | LoginFail
    | LoginAuto
    | Logout
    | ClearError
    | UndefinedAction;
