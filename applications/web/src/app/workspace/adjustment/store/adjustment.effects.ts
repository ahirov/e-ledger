import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, switchMap } from "rxjs/operators";
import { ObservableInput, of } from "rxjs";

import { DialogMode } from "../model/state.model";
import { ICredentials } from "../model/credentials.model";
import { SettingRequest } from "../model/request.model";
import { ISettingResponse } from "../model/response.model";
import { IAuthRequest } from "../../../auth/model/request.model";
import { IAuthResponse } from "../../../auth/model/response.model";
import { AuthResponseService } from "../../../auth/auth-response.service";
import { AdjustmentResponseService } from "../adjustment-response.service";
import { UndefinedAction } from "../../../shared/store/undefined.action";

import { environment } from "applications/web/src/environments/environment";
import { selectors } from "../../../auth/store/auth.selectors";
import * as fromUserActions from "../../../auth/store/auth.actions";
import * as fromActions from "./adjustment.actions";

@Injectable()
export class AdjustmentEffects {
    constructor(
        private _authService: AuthResponseService,
        private _adjustmentService: AdjustmentResponseService,
        private _http: HttpClient,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    saveSettings$ = createEffect(() =>
        this._actions$.pipe(
            ofType<{ payload: ICredentials } & TypedAction<any>>(
                fromActions.SAVE_SETTINGS,
            ),
            concatLatestFrom(() => [this._store$.select(selectors.user)]),
            switchMap(([action, user]) => {
                if (user && user.idToken) {
                    return this._http
                        .post<ISettingResponse>(
                            environment.webApiUpdateUrl,
                            new SettingRequest(
                                user.idToken,
                                action.payload.email,
                                action.payload.password || undefined,
                            ),
                        )
                        .pipe(
                            switchMap(response => [
                                this.processAuth(response),
                                fromActions.setMode({
                                    payload: DialogMode.Saved,
                                }),
                            ]),
                            catchError(response => this.processError(response)),
                        );
                }
                return of(new UndefinedAction());
            }),
        ),
    );

    loginSettings$ = createEffect(() =>
        this._actions$.pipe(
            ofType<
                {
                    payload: {
                        request: IAuthRequest;
                        credentials: ICredentials;
                    };
                } & TypedAction<any>
            >(fromActions.LOGIN_SETTINGS),
            switchMap(action => {
                return this._http
                    .post<IAuthResponse>(
                        environment.webApiLoginUrl,
                        action.payload.request.copy(),
                    )
                    .pipe(
                        switchMap(response => [
                            this.processAuth(response),
                            fromActions.saveSettings({
                                payload: action.payload.credentials.copy(),
                            }),
                        ]),
                        catchError(response => this.processError(response)),
                    );
            }),
        ),
    );

    private processAuth(
        response: IAuthResponse | ISettingResponse,
    ): fromUserActions.AuthAction {
        const user = this._authService.processAuthentication(response);
        return this._adjustmentService.isUserResponse(response)
            ? new fromUserActions.LoginEnd({ user: user, isRedirected: false })
            : new UndefinedAction();
    }

    private processError(response: any): ObservableInput<TypedAction<any>> {
        const message = response?.error?.error?.message;
        return of(
            message && this._adjustmentService.isReAuthRequired(message)
                ? fromActions.setMode({ payload: DialogMode.ReAuth })
                : fromActions.setError({
                      payload: this._authService.processError(response),
                  }),
        );
    }
}
