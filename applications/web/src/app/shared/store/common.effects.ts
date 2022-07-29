import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs/operators";

import { clear as clearDataIncome } from "../../workspace/data/store/income.actions";
import { clear as clearDataOutcome } from "../../workspace/data/store/outcome.actions";
import { clear as clearChartIncome } from "../../workspace/chart/store/income.actions";
import { clear as clearChartOutcome } from "../../workspace/chart/store/outcome.actions";
import { clear as clearSummaryIncome } from "../../workspace/summary/store/income.actions";
import { clear as clearSummaryOutcome } from "../../workspace/summary/store/outcome.actions";
import { clear as clearAdjustment } from "../../workspace/adjustment/store/adjustment.actions";

import { Clear as ClearAuth } from "../../auth/store/auth.actions";
import * as fromActions from "./common.actions";

@Injectable()
export class CommonEffects {
    constructor(private _actions$: Actions) {}

    reset$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.CLEAR),
            switchMap(() => [
                clearDataIncome(),
                clearDataOutcome(),
                clearChartIncome(),
                clearChartOutcome(),
                clearSummaryIncome(),
                clearSummaryOutcome(),
                clearAdjustment(),
                new ClearAuth(),
            ]),
        ),
    );
}
