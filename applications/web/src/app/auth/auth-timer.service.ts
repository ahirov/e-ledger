import { Injectable, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Subscription, timer } from "rxjs";

import * as fromApp from "../store/app.state";
import * as fromActions from "../auth/store/auth.actions";

@Injectable()
export class AuthTimerService implements OnDestroy {
    private _timer: Subscription | null = null;

    constructor(private _store$: Store<fromApp.AppState>) {}

    public ngOnDestroy(): void {
        this.clearTimer();
    }

    public setTimer(expirationDate: Date): void {
        this.clearTimer();
        this._timer = timer(expirationDate).subscribe(() => {
            this._store$.dispatch(new fromActions.Logout());
        });
    }

    public clearTimer(): void {
        if (this._timer) {
            this._timer.unsubscribe();
            this._timer = null;
        }
    }
}
