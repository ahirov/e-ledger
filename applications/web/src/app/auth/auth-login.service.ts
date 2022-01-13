import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AuthUser } from "./auth.model";
import { AuthTimerService } from "./auth-timer.service";
import { AppStorage, StorageKey } from "../shared/store/app.storage";
import { UndefinedAction } from "../shared/store/undefined.action";
import * as fromActions from "./store/auth.actions";

@Injectable()
export class AuthLoginService {
    constructor(
        private _router: Router,
        private _storage: AppStorage,
        private _timer: AuthTimerService,
    ) {}

    public processLogin(data: fromActions.LoginEnd): void {
        if (data.payload.redirect) {
            this._router.navigate(["/"]);
        }
    }
    public processAutoLogin(): fromActions.AuthAction {
        const userData: any = this._storage.loadData(StorageKey.User);
        if (userData) {
            const user = new AuthUser(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate),
            );
            if (user.token) {
                this._timer.setTimer(user.tokenExpirationDate);
                return new fromActions.LoginEnd({
                    user: user,
                    redirect: false,
                });
            }
        }
        return new UndefinedAction();
    }

    public processLogout(): void {
        this._storage.clearData(StorageKey.User);
        this._timer.clearTimer();
        this._router.navigate(["/auth"]);
    }
}
