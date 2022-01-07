import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppState } from "../../store/app.model";
import { IncomeFilter, Source } from "../model/income.model";
import { Category, OutcomeFilter } from "../model/outcome.model";

import * as fromIncomeActions from "../store/income.actions";
import * as fromOutcomeActions from "../store/outcome.actions";

@Injectable()
export class SummaryService {
    constructor(private _store$: Store<AppState>) {}

    public setIncomeFilter(
        startedAt: Date | null,
        endedAt: Date | null,
        source: Source | null,
    ): void {
        this._store$.dispatch(
            fromIncomeActions.setFilter({
                payload: new IncomeFilter(
                    startedAt ? new Date(startedAt).toDate() : null,
                    endedAt ? new Date(endedAt).toDate() : null,
                    source,
                ),
            }),
        );
    }

    public setOutcomeFilter(
        processedAt: Date | null,
        category: Category | null,
        description: string | null,
    ): void {
        this._store$.dispatch(
            fromOutcomeActions.setFilter({
                payload: new OutcomeFilter(
                    processedAt ? new Date(processedAt).toDate() : null,
                    category,
                    description ? description : null,
                ),
            }),
        );
    }
}
