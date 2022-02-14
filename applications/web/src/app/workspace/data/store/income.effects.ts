import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";

import { switchMap } from "rxjs/operators";
import { IIncomeData } from "../model/income.model";
import { IncomeService } from "./income.service";
import { selectors } from "./state.selectors";
import * as fromSummaryActions from "../../summary/store/income.actions";
import * as fromChartActions from "../../chart/store/income.actions";
import * as fromActions from "./income.actions";

@Injectable()
export class WorkspaceIncomeEffects {
    constructor(
        private _incomeService: IncomeService,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    addIncome$ = createEffect(() =>
        this._actions$.pipe(
            ofType<{ payload: IIncomeData } & TypedAction<any>>(
                fromActions.ADD_INCOME,
            ),
            switchMap(action => [
                fromActions.processYears({ payload: [action.payload] }),
                fromSummaryActions.addIncome(action),
            ]),
        ),
    );

    addIncomes$ = createEffect(() =>
        this._actions$.pipe(
            ofType<{ payload: IIncomeData[] } & TypedAction<any>>(
                fromActions.ADD_INCOMES,
            ),
            switchMap(action => [
                fromActions.processYears({ payload: action.payload }),
                fromSummaryActions.processOutput(),
            ]),
        ),
    );

    deleteIncome$ = createEffect(() =>
        this._actions$.pipe(
            ofType<{ payload: string } & TypedAction<any>>(
                fromActions.DELETE_INCOME,
            ),
            switchMap(action => [
                fromActions.processYears({ payload: [] }),
                fromSummaryActions.deleteIncome(action),
                fromSummaryActions.processPage(),
            ]),
        ),
    );

    processIncomeYears$ = createEffect(() =>
        this._actions$.pipe(
            ofType<{ payload: IIncomeData[] } & TypedAction<any>>(
                fromActions.PROCESS_YEARS,
            ),
            concatLatestFrom(() => [
                this._store$.select(selectors.income.items),
                this._store$.select(selectors.income.years),
            ]),
            switchMap(([action, allItems, allYears]) => [
                fromActions.setYears({
                    payload: this._incomeService.getYears(
                        action.payload,
                        allItems,
                        allYears,
                    ),
                }),
                fromChartActions.processYear(),
            ]),
        ),
    );
}
