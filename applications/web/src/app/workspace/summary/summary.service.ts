import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { IncomeFilter } from "./model/income.model";
import { OutcomeFilter } from "./model/outcome.model";
import { setFilter as setIncomeFilter } from "./store/income.actions";
import { setFilter as setOutcomeFilter } from "./store/outcome.actions";

@Injectable()
export class SummaryService {
    constructor(private _store$: Store) {}

    public setIncomeFilter(
        from: Date | null,
        to: Date | null,
        sourceId: number | null,
    ): void {
        this._store$.dispatch(
            setIncomeFilter({
                payload: new IncomeFilter(
                    from ? new Date(from).toDate() : null,
                    to ? new Date(to).toDate() : null,
                    sourceId,
                ),
            }),
        );
    }

    public setOutcomeFilter(
        date: Date | null,
        categoryId: number | null,
        description: string | null,
    ): void {
        this._store$.dispatch(
            setOutcomeFilter({
                payload: new OutcomeFilter(
                    date ? new Date(date).toDate() : null,
                    categoryId,
                    description ? description : null,
                ),
            }),
        );
    }
}
