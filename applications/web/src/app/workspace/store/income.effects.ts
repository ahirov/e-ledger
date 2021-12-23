import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Dictionary } from "@ngrx/entity";
import { map, switchMap } from "rxjs/operators";

import { IIncome } from "../model/income.model";
import { UndefinedAction } from "../../store/undefined.action";
import { environment } from "applications/web/src/environments/environment";

import * as fromActions from "./income.actions";
import * as fromApp from "../../store/app.state";
import * as _ from "lodash";

@Injectable()
export class IncomeEffects {
    constructor(
        private _actions$: Actions,
        private _store$: Store<fromApp.AppState>,
    ) {}

    addIncome$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.ADD_INCOME),
            map((): Action => fromActions.processOutput()),
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
            map((): Action => fromActions.processOutput()),
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
                this._store$.select(fromApp.appSelectors.income.filter),
                this._store$.select(fromApp.appSelectors.income.items),
            ]),
            map(([, filter, items]): string[] => {
                const filteredItems = _.filter<Dictionary<IIncome>>(
                    items,
                    (item: IIncome) => {
                        const isStartedAt =
                            filter.startedAt === null ||
                            filter.startedAt <= item.endedAt;
                        const isEndedAt =
                            filter.endedAt === null ||
                            filter.endedAt >= item.startedAt;
                        const isSource =
                            filter.source === null ||
                            filter.source === item.source;

                        return isStartedAt && isEndedAt && isSource;
                    },
                );
                return _.map(filteredItems, (item: IIncome) => item.id);
            }),
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
                this._store$.select(fromApp.appSelectors.income.activePage),
                this._store$.select(fromApp.appSelectors.income.pagesCount),
            ]),
            map(([, activePage, pagesCount]): Action => {
                return activePage >= pagesCount
                    ? fromActions.selectPage({ payload: pagesCount - 1 })
                    : new UndefinedAction();
            }),
        ),
    );

    selectPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.SELECT_PAGE),
            concatLatestFrom(() =>
                this._store$.select(fromApp.appSelectors.income.outputCount),
            ),
            map(([action, count]: [{ payload: number }, number]): Action => {
                const newPage = action.payload;
                return newPage >= 0 &&
                    newPage < _.ceil(count / environment.pageItemsCount)
                    ? fromActions.setPage({ payload: newPage })
                    : new UndefinedAction();
            }),
        ),
    );
}
