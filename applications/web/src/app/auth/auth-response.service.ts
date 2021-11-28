import { Injectable } from "@angular/core";

import { ObservableInput, of } from "rxjs";

import { AuthUser } from "./auth.model";
import { AuthResponse } from "./auth.model";
import { AuthTimerService } from "./auth-timer.service";
import { AppStorage, StorageKey } from "../store/app.storage";
import * as fromActions from "./store/auth.actions";

@Injectable()
export class AuthResponseService {
    constructor(
        private _storage: AppStorage,
        private _timer: AuthTimerService,
    ) {}

    public processAuthentication(data: AuthResponse): fromActions.LoginEnd {
        const expirationDate = new Date(
            new Date().getTime() + +data.expiresIn * 1000,
        );
        const user = new AuthUser(
            data.email,
            data.localId,
            data.idToken,
            expirationDate,
        );
        this._storage.saveData(StorageKey.User, user);
        this._timer.setTimer(expirationDate);
        return new fromActions.LoginEnd({
            user: user,
            redirect: true,
        });
    }

    public processError(responce: any): ObservableInput<fromActions.LoginFail> {
        let message = "An unknown error occurred!";
        if (responce?.error?.error) {
            switch (responce.error.error.message) {
                case "EMAIL_EXISTS":
                    message = "The email is already exists!";
                    break;
                case "OPERATION_NOT_ALLOWED":
                    message = "The operation is not allowed!";
                    break;
                case "TOO_MANY_ATTEMPTS_TRY_LATER":
                    message = "Too many attempts. Try later!";
                    break;
                case "EMAIL_NOT_FOUND":
                    message = "The email is not found!";
                    break;
                case "INVALID_PASSWORD":
                    message = "The password is incorrect!";
                    break;
                case "USER_DISABLED":
                    message = "The user account is disabled!";
                    break;
            }
        }
        return of(new fromActions.LoginFail(message));
    }
}
