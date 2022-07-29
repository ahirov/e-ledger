import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromActions from "../../shared/store/common.actions";

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
export class PanelExitComponent {
    constructor(private _store$: Store) {}

    public onLogout(): void {
        this._store$.dispatch(fromActions.clear());
    }
}
