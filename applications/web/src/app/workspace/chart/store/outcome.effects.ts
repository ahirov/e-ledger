import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";

import { map, switchMap } from "rxjs/operators";
import { OutcomeService } from "./outcome.service";
import { UndefinedAction } from "../../../shared/store/undefined.action";
import { selectors as dataSelectors } from "../../data/store/state.selectors";
import { selectors } from "./state.selectors";
import * as fromActions from "./outcome.actions";
import * as _ from "lodash";

@Injectable()
export class ChartOutcomeEffects {
    constructor(
        private _outcomeService: OutcomeService,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    setOutcomeYear$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.SET_YEAR),
            switchMap(() => [
                fromActions.processPoints(),
                fromActions.processSections(),
            ]),
        ),
    );

    processOutcomeYear$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.PROCESS_YEAR),
            concatLatestFrom(() => [
                this._store$.select(selectors.outcome.year),
                this._store$.select(dataSelectors.outcome.years),
            ]),
            map(([, year, years]) => {
                if (year) {
                    return fromActions.setYear({
                        payload: _.some(years, item => item === year)
                            ? year
                            : null,
                    });
                }
                return new UndefinedAction();
            }),
        ),
    );

    setOutcomePoints$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.PROCESS_POINTS),
            concatLatestFrom(() => [
                this._store$.select(selectors.outcome.year),
                this._store$.select(dataSelectors.outcome.items),
            ]),
            map(
                ([, year, items]): Action =>
                    fromActions.setPoints({
                        payload: this._outcomeService.getPoints(year, items),
                    }),
            ),
        ),
    );

    setOutcomeSections$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.PROCESS_SECTIONS),
            concatLatestFrom(() => [
                this._store$.select(selectors.outcome.year),
                this._store$.select(dataSelectors.outcome.items),
            ]),
            map(
                ([, year, items]): Action =>
                    fromActions.setSections({
                        payload: this._outcomeService.getSections(year, items),
                    }),
            ),
        ),
    );
}
