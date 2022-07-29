import { Action } from "@ngrx/store";

import { IAuthUser } from "../model/user.model";
import { IAuthRequest } from "../model/request.model";
import { UndefinedAction } from "../../shared/store/undefined.action";

export const SIGNUP_START = "[Auth] Signup start";
export const LOGIN_START  = "[Auth] Login start";
export const LOGIN_END    = "[Auth] Login end";
export const LOGIN_FAIL   = "[Auth] Login fail";
export const LOGIN_AUTO   = "[Auth] Login auto";
export const CLEAR        = "[Auth] Clear";

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: IAuthRequest) {}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: IAuthRequest) {}
}

export class LoginEnd implements Action {
    readonly type = LOGIN_END;
    constructor(
        public payload: {
            user: IAuthUser;
            isRedirected: boolean;
        },
    ) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: string) {}
}

export class LoginAuto implements Action {
    readonly type = LOGIN_AUTO;
}

export class Clear implements Action {
    readonly type = CLEAR;
}

export type AuthAction =
    | SignupStart
    | LoginStart
    | LoginEnd
    | LoginFail
    | LoginAuto
    | Clear
    | UndefinedAction;
