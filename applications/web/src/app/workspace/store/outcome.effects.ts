import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Dictionary } from "@ngrx/entity";
import { map, switchMap } from "rxjs/operators";

import { IOutcome } from "../model/outcome.model";
import { UndefinedAction } from "../../store/undefined.action";
import { environment } from "applications/web/src/environments/environment";

import * as fromActions from "./outcome.actions";
import * as fromApp from "../../store/app.state";
import * as _ from "lodash";

@Injectable()
export class OutcomeEffects {
    constructor(
        private _actions$: Actions,
        private _store$: Store<fromApp.AppState>,
    ) {}

    addOutcome$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.ADD_OUTCOME),
            map((): Action => fromActions.processOutput()),
        ),
    );

    addOutcomes$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.ADD_OUTCOMES),
            map((): Action => fromActions.processOutput()),
        ),
    );

    deleteOutcome$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.DELETE_OUTCOME),
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
                this._store$.select(fromApp.appSelectors.outcome.filter),
                this._store$.select(fromApp.appSelectors.outcome.items),
            ]),
            map(([, filter, items]): string[] => {
                const filteredItems = _.filter<Dictionary<IOutcome>>(
                    items,
                    (item: IOutcome) => {
                        const isProcessedAt =
                            filter.processedAt === null ||
                            _.isEqual(filter.processedAt, item.processedAt);
                        const isCategory =
                            filter.category === null ||
                            filter.category === item.category;
                        const isDescription =
                            filter.description === null ||
                            (item.description !== null &&
                                item.description?.indexOf(
                                    filter.description,
                                ) !== -1);

                        return isProcessedAt && isCategory && isDescription;
                    },
                );
                return _.map(filteredItems, (item: IOutcome) => item.id);
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

    selectPage$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.SELECT_PAGE),
            concatLatestFrom(() =>
                this._store$.select(fromApp.appSelectors.outcome.outputCount),
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
