import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { selectors } from "../data/store/state.selectors";
import * as fromDataActions from "../data/store/common.actions";
import * as fromActions from "../../shared/store/common.actions";

@Component({
    template: `<div
        class="d-flex flex-lg-column align-items-center justify-content-evenly h-100">
        <button
            type="button"
            class="btn btn-primary w-50 mx-4 my-3 my-lg-0 fw-bold"
            (click)="onSave()"
            [disabled]="!isUnsaved">
            Save
        </button>
        <button
            type="button"
            class="btn btn-primary w-50 mx-4 my-3 my-lg-0 fw-bold"
            (click)="onLogout()">
            Exit
        </button>
    </div>`,
})
export class PanelExitComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;
    public isUnsaved = false;

    constructor(private _store$: Store) {}

    public ngOnInit(): void {
        this._sub = this._store$
            .select(selectors.isUnsaved)
            .subscribe(isUnsaved => {
                this.isUnsaved = isUnsaved;
            });
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public onSave(): void {
        this._store$.dispatch(fromDataActions.setSaved());
    }

    public onLogout(): void {
        this._store$.dispatch(fromActions.clear());
    }
}
