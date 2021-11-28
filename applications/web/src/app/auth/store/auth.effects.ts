import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, ofType, createEffect } from "@ngrx/effects";

import { Observable, ObservableInput } from "rxjs";
import { switchMap, catchError, map, tap } from "rxjs/operators";

import { AuthResponse } from "../auth.model";
import { AuthLoginService } from "../auth-login.service";
import { AuthResponseService } from "../auth-response.service";
import { environment } from "../../../environments/environment";
import { credentials } from "../../../environments/credentials";
import * as fromActions from "./auth.actions";

@Injectable()
export class AuthEffects {
    constructor(
        private _actions$: Actions,
        private _responceService: AuthResponseService,
        private _loginService: AuthLoginService,
        private _http: HttpClient,
    ) {}

    signupStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.SIGNUP_START),
            switchMap((data: fromActions.SignupStart): Observable<fromActions.AuthAction> => {
                return this._http
                    .post<AuthResponse>(
                        `${environment.webApiSignupPath}${credentials.webApiKey}`,
                        data.payload.copy(),
                    )
                    .pipe(
                        map(
                            (data: AuthResponse): fromActions.LoginEnd =>
                                this._responceService.processAuthentication(data),
                        ),
                        catchError(
                            (data: AuthResponse): ObservableInput<fromActions.LoginFail> =>
                                this._responceService.processError(data),
                        ),
                    );
            }),
        ),
    );

    loginStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.LOGIN_START),
            switchMap((data: fromActions.LoginStart): Observable<fromActions.AuthAction> => {
                return this._http
                    .post<AuthResponse>(
                        `${environment.webApiLoginPath}${credentials.webApiKey}`,
                        data.payload.copy(),
                    )
                    .pipe(
                        map(
                            (data: AuthResponse): fromActions.LoginEnd =>
                                this._responceService.processAuthentication(data),
                        ),
                        catchError(
                            (data: AuthResponse): ObservableInput<fromActions.LoginFail> =>
                                this._responceService.processError(data),
                        ),
                    );
            }),
        ),
    );

    loginEnd$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(fromActions.LOGIN_END),
                tap((data: fromActions.LoginEnd): void =>
                    this._loginService.processLogin(data),
                ),
            ),
        { dispatch: false },
    );

    loginAuto$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.LOGIN_AUTO),
            map((): fromActions.AuthAction => this._loginService.processAutoLogin()),
        ),
    );

    logout$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(fromActions.LOGOUT),
                tap((): void => this._loginService.processLogout()),
            ),
        { dispatch: false },
    );
}
