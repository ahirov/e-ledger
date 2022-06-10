import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Observable, ObservableInput, of } from "rxjs";
import { switchMap, catchError, map, tap } from "rxjs/operators";

import { IAuthResponse } from "../model/response.model";
import { AuthLoginService } from "../auth-login.service";
import { AuthResponseService } from "../auth-response.service";
import { environment } from "../../../environments/environment";
import * as fromActions from "./auth.actions";

@Injectable()
export class AuthEffects {
    constructor(
        private _responseService: AuthResponseService,
        private _loginService: AuthLoginService,
        private _http: HttpClient,
        private _actions$: Actions,
    ) {}

    signupStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.SIGNUP_START),
            switchMap(
                (
                    action: fromActions.SignupStart,
                ): Observable<fromActions.AuthAction> => {
                    return this._http
                        .post<IAuthResponse>(
                            environment.webApiSignupUrl,
                            action.payload.copy(),
                        )
                        .pipe(
                            map(response => this.processAuth(response)),
                            catchError(response => this.processError(response)),
                        );
                },
            ),
        ),
    );

    loginStart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.LOGIN_START),
            switchMap(
                (
                    action: fromActions.LoginStart,
                ): Observable<fromActions.AuthAction> => {
                    return this._http
                        .post<IAuthResponse>(
                            environment.webApiLoginUrl,
                            action.payload.copy(),
                        )
                        .pipe(
                            map(response => this.processAuth(response)),
                            catchError(response => this.processError(response)),
                        );
                },
            ),
        ),
    );

    loginEnd$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(fromActions.LOGIN_END),
                tap(action => this._loginService.processLogin(action)),
            ),
        { dispatch: false },
    );

    loginAuto$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.LOGIN_AUTO),
            map(() => this._loginService.processAutoLogin()),
        ),
    );

    logout$ = createEffect(
        () =>
            this._actions$.pipe(
                ofType(fromActions.LOGOUT),
                tap(() => this._loginService.processLogout()),
            ),
        { dispatch: false },
    );

    private processAuth(response: IAuthResponse): fromActions.LoginEnd {
        const user = this._responseService.processAuthentication(response);
        return new fromActions.LoginEnd({ user: user, isRedirected: true });
    }

    private processError(
        response: any,
    ): ObservableInput<fromActions.LoginFail> {
        const message = this._responseService.processError(response);
        return of(new fromActions.LoginFail(message));
    }
}
