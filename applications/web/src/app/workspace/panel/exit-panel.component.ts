import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromActions from "../../auth/store/auth.actions";

@Component({
    template: `<div
        class="d-flex flex-lg-column align-items-center justify-content-evenly h-100">
        <button
            type="button"
            class="btn btn-primary w-50 mx-4 my-3 my-lg-0 fw-bold"
            (click)="onLogout()">
            Exit
        </button>
    </div>`,
})
export class ExitPanelComponent {
    constructor(private _store$: Store) {}

    public onLogout(): void {
        this._store$.dispatch(new fromActions.Logout());
    }
}
