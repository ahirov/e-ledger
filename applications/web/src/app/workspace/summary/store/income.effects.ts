import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import { UndefinedAction } from "../../../shared/store/undefined.action";
import { StateService } from "./state.service";
import { selectors as dataSelectors } from "../../data/store/state.selectors";
import { selectors } from "./state.selectors";
import * as fromActions from "./income.actions";

@Injectable()
export class SummaryIncomeEffects {
    constructor(
        private _stateService: StateService,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    setIncomeFilter$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.SET_FILTER),
            map(() => fromActions.processOutput()),
        ),
    );

    processOutput$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.PROCESS_OUTPUT),
            concatLatestFrom(() => [
                this._store$.select(selectors.income.filter),
                this._store$.select(dataSelectors.income.items),
            ]),
            map(([, filter, items]) =>
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
                this._store$.select(selectors.income.page),
                this._store$.select(selectors.income.pagesCount),
            ]),
            map(([, activePage, pagesCount]) => {
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
            ofType<{ payload: number } & TypedAction<any>>(
                fromActions.SELECT_PAGE,
            ),
            concatLatestFrom(() =>
                this._store$.select(selectors.income.itemsCount),
            ),
            map(([action, outputItemsCount]) => {
                const page = this._stateService.selectActivePage(
                    action.payload,
                    outputItemsCount,
                );
                return page
                    ? fromActions.setPage({ payload: page.payload })
                    : new UndefinedAction();
            }),
        ),
    );
}
