import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";

import { AppState } from "../../store/app.model";
import { StateService } from "./state.service";
import { UndefinedAction } from "../../store/undefined.action";

import * as fromActions from "./income.actions";
import * as fromApp from "../../store/app.state";

@Injectable()
export class IncomeEffects {
    constructor(
        private _stateService: StateService,
        private _actions$: Actions,
        private _store$: Store<AppState>,
    ) {}

    addIncome$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.ADD_INCOME),
            map((): Action => fromActions.processPage()),
        ),
    );

    addIncomes$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.ADD_INCOMES),
            map((): Action => fromActions.processOutput()),
        ),
    );

    deleteIncome$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.DELETE_INCOME),
            map((): Action => fromActions.processPage()),
        ),
    );

    setFilter$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.SET_FILTER),
            map((): Action => fromActions.processOutput()),
        ),
    );

    processOutput$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.PROCESS_OUTPUT),
            concatLatestFrom(() => [
                this._store$.select(fromApp.appSelectors.income.summaryFilter),
                this._store$.select(fromApp.appSelectors.income.items),
            ]),
            map(([, filter, items]): string[] =>
                this._stateService.getIds(filter, items),
            ),
            switchMap(ids => [
                fromActions.setOutput({ payload: ids }),
                fromActions.processPage(),
            ]),
        ),
    );

    processPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.PROCESS_PAGE),
            concatLatestFrom(() => [
                this._store$.select(fromApp.appSelectors.income.summaryActivePage),
                this._store$.select(fromApp.appSelectors.income.summaryPagesCount),
            ]),
            map(([, activePage, pagesCount]): Action => {
                const page = this._stateService.checkActivePage(
                    activePage,
                    pagesCount,
                );
                return page
                    ? fromActions.selectPage({ payload: page.payload })
                    : new UndefinedAction();
            }),
        ),
    );

    selectPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.SELECT_PAGE),
            concatLatestFrom(() =>
                this._store$.select(
                    fromApp.appSelectors.income.summaryItemsCount,
                ),
            ),
            map(
                ([action, outputItemsCount]: [
                    { payload: number },
                    number,
                ]): Action => {
                    const page = this._stateService.selectActivePage(
                        action.payload,
                        outputItemsCount,
                    );
                    return page
                        ? fromActions.setPage({ payload: page.payload })
                        : new UndefinedAction();
                },
            ),
        ),
    );
}
