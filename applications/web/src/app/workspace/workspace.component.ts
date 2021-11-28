import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.state";
import * as fromActions from "../auth/store/auth.actions";

@Component({
    templateUrl: "./workspace.component.html",
    styleUrls: ["./workspace.component.scss"],
})
export class WorkspaceComponent {
    constructor(private _store$: Store<fromApp.AppState>) {}

    public onLogout(): void {
        this._store$.dispatch(new fromActions.Logout());
    }
}
