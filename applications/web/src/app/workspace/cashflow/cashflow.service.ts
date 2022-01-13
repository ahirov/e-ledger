import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Income } from "../data/model/income.model";
import { Outcome } from "../data/model/outcome.model";
import * as fromOutcomeActions from "../data/store/outcome.actions";
import * as fromIncomeActions from "../data/store/income.actions";

@Injectable()
export class CashflowService {
    constructor(private _store$: Store) {}

    public addIncome(form: NgForm): void {
        const value = form.value;
        const startedAt = new Date(value.startedAt);
        const endedAt = new Date(value.endedAt);
        const source = parseInt(value.source);
        const sum = parseFloat(value.sum);

        if (startedAt && endedAt && source && sum) {
            const startedDate = startedAt.toDate();
            const endedDate = endedAt.toDate();

            if (startedDate <= endedDate) {
                this._store$.dispatch(
                    fromIncomeActions.addIncome({
                        payload: new Income(
                            startedDate,
                            endedDate,
                            source,
                            sum,
                        ),
                    }),
                );
                form.reset();
            }
        }
    }

    public addOutcome(form: NgForm): void {
        const value = form.value;
        const processedAt = new Date(value.processedAt);
        const category = parseInt(value.category);
        const sum = parseFloat(value.sum);
        const description = value.description;

        if (processedAt && category && sum) {
            this._store$.dispatch(
                fromOutcomeActions.addOutcome({
                    payload: new Outcome(
                        processedAt.toDate(),
                        category,
                        sum,
                        description ? description : null,
                    ),
                }),
            );
            form.reset();
        }
    }
}
