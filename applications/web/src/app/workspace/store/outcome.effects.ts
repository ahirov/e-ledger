import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import { UndefinedAction } from "../../store/undefined.action";
import * as fromActions from "./outcome.actions";
import * as fromApp from "../../store/app.state";

@Injectable()
export class OutcomeEffects {
    constructor(
        private _actions$: Actions,
        private _store$: Store<fromApp.AppState>,
    ) {}

    deleteIncome$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.DELETE_OUTCOME),
            concatLatestFrom(() => [
                this._store$.select(fromApp.appSelectors.outcome.activePage),
                this._store$.select(fromApp.appSelectors.outcome.pagesCount),
            ]),
            map(([, activePage, pagesCount]): Action => {
                return activePage >= pagesCount
                    ? fromActions.selectPage({ payload: pagesCount - 1 })
                    : new UndefinedAction();
            }),
        ),
    );
}
