import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Income } from "../data/model/income.model";
import { Outcome } from "../data/model/outcome.model";
import * as fromIncomeActions from "../data/store/income.actions";
import * as fromOutcomeActions from "../data/store/outcome.actions";

@Injectable()
export class CashflowService {
    constructor(private _store$: Store) {}

    public addIncome(form: NgForm): void {
        const value = form.value;
        const from = new Date(value.from);
        const to = new Date(value.to);
        const source = parseInt(value.source);
        const sum = parseFloat(value.sum);

        const fromDate = from.toDate();
        const toDate = to.toDate();

        if (fromDate <= toDate) {
            this._store$.dispatch(
                fromIncomeActions.addIncome({
                    payload: new Income(fromDate, toDate, source, sum),
                }),
            );
            form.reset();
        }
    }

    public addOutcome(form: NgForm): void {
        const value = form.value;
        const date = new Date(value.date);
        const category = parseInt(value.category);
        const sum = parseFloat(value.sum);
        const description = value.description;

        this._store$.dispatch(
            fromOutcomeActions.addOutcome({
                payload: new Outcome(date.toDate(), category, sum, description),
            }),
        );
        form.reset();
    }
}
