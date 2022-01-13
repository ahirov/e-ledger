import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";

import { map, switchMap } from "rxjs/operators";
import { IncomeService } from "./income.service";
import { UndefinedAction } from "../../../shared/store/undefined.action";
import { selectors as dataSelectors } from "../../data/store/state.selectors";
import { selectors } from "./state.selectors";
import * as fromActions from "./income.actions";
import * as _ from "lodash";

@Injectable()
export class ChartIncomeEffects {
    constructor(
        private _incomeService: IncomeService,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    setIncomeYear$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.SET_YEAR),
            switchMap(() => [
                fromActions.processPoints(),
                fromActions.processSections(),
            ]),
        ),
    );

    processIncomeYear$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.PROCESS_YEAR),
            concatLatestFrom(() => [
                this._store$.select(selectors.income.year),
                this._store$.select(dataSelectors.income.years),
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

    processIncomePoints$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.PROCESS_POINTS),
            concatLatestFrom(() => [
                this._store$.select(selectors.income.year),
                this._store$.select(dataSelectors.income.items),
            ]),
            map(([, year, items]) =>
                fromActions.setPoints({
                    payload: this._incomeService.getPoints(year, items),
                }),
            ),
        ),
    );

    processIncomeSections$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.PROCESS_SECTIONS),
            concatLatestFrom(() => [
                this._store$.select(selectors.income.year),
                this._store$.select(dataSelectors.income.items),
            ]),
            map(([, year, items]) =>
                fromActions.setSections({
                    payload: this._incomeService.getSections(year, items),
                }),
            ),
        ),
    );
}
