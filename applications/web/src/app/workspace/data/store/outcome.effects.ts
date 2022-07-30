import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";

import { map, switchMap } from "rxjs/operators";
import { IOutcomeData } from "../model/outcome.model";
import { OutcomeService } from "./outcome.service";
import { selectors } from "./state.selectors";
import * as fromSummaryActions from "../../summary/store/outcome.actions";
import * as fromChartActions from "../../chart/store/outcome.actions";
import * as fromCommonActions from "./common.actions";
import * as fromActions from "./outcome.actions";

@Injectable()
export class WorkspaceOutcomeEffects {
    constructor(
        private _outcomeService: OutcomeService,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    addOutcome$ = createEffect(() =>
        this._actions$.pipe(
            ofType<{ payload: IOutcomeData } & TypedAction<any>>(
                fromActions.ADD_OUTCOME,
            ),
            switchMap(action => [
                fromActions.processYears({ payload: [action.payload] }),
                fromSummaryActions.addOutcome(action),
                fromCommonActions.setUnsaved(),
            ]),
        ),
    );

    addOutcomes$ = createEffect(() =>
        this._actions$.pipe(
            ofType<{ payload: IOutcomeData[] } & TypedAction<any>>(
                fromActions.ADD_OUTCOMES,
            ),
            switchMap(action => [
                fromActions.processYears({ payload: action.payload }),
                fromSummaryActions.processOutput(),
                fromCommonActions.setUnsaved(),
            ]),
        ),
    );

    deleteOutcome$ = createEffect(() =>
        this._actions$.pipe(
            ofType<{ payload: string } & TypedAction<any>>(
                fromActions.DELETE_OUTCOME,
            ),
            switchMap(action => [
                fromActions.processYears({ payload: [] }),
                fromSummaryActions.deleteOutcome(action),
                fromSummaryActions.processPage(),
                fromCommonActions.setUnsaved(),
            ]),
        ),
    );

    deleteOutcomes$ = createEffect(() =>
        this._actions$.pipe(
            ofType(fromActions.DELETE_OUTCOMES),
            map(() => fromCommonActions.setUnsaved()),
        ),
    );

    processOutcomeYears$ = createEffect(() =>
        this._actions$.pipe(
            ofType<{ payload: IOutcomeData[] } & TypedAction<any>>(
                fromActions.PROCESS_YEARS,
            ),
            concatLatestFrom(() => [
                this._store$.select(selectors.outcome.items),
                this._store$.select(selectors.outcome.years),
            ]),
            switchMap(([action, allItems, allYears]) => [
                fromActions.setYears({
                    payload: this._outcomeService.getYears(
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
