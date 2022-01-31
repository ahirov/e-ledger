import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Source } from "../data/model/income.model";
import { Category } from "../data/model/outcome.model";
import { IncomeFilter } from "./model/income.model";
import { OutcomeFilter } from "./model/outcome.model";
import * as fromIncomeActions from "./store/income.actions";
import * as fromOutcomeActions from "./store/outcome.actions";

@Injectable()
export class SummaryService {
    constructor(private _store$: Store) {}

    public setIncomeFilter(
        from: Date | null,
        to: Date | null,
        source: Source | null,
    ): void {
        this._store$.dispatch(
            fromIncomeActions.setFilter({
                payload: new IncomeFilter(
                    from ? new Date(from).toDate() : null,
                    to ? new Date(to).toDate() : null,
                    source,
                ),
            }),
        );
    }

    public setOutcomeFilter(
        date: Date | null,
        category: Category | null,
        description: string | null,
    ): void {
        this._store$.dispatch(
            fromOutcomeActions.setFilter({
                payload: new OutcomeFilter(
                    date ? new Date(date).toDate() : null,
                    category,
                    description ? description : null,
                ),
            }),
        );
    }
}
