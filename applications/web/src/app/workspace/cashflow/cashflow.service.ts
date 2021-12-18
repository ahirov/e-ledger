import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Income } from "../model/income.model";
import { Outcome } from "../model/outcome.model";
import * as fromOutcomeActions from "../store/outcome.actions";
import * as fromIncomeActions from "../store/income.actions";
import * as fromApp from "../../store/app.state";

@Injectable()
export class CashflowService {
    constructor(private _store$: Store<fromApp.AppState>) {}

    public addIncome(form: NgForm): void {
        const value = form.value;
        const startedAt = new Date(value.startedAt);
        const endedAt = new Date(value.endedAt);
        const source = parseInt(value.source);
        const sum = parseFloat(value.sum);

        if (startedAt && endedAt && source && sum && startedAt <= endedAt) {
            this._store$.dispatch(
                fromIncomeActions.addIncome({
                    payload: new Income(startedAt, endedAt, source, sum),
                }),
            );
            form.reset();
        }
    }

    public addOutcome(form: NgForm): void {
        const value = form.value;
        const processedAt = new Date(value.processedAt);
        const category = parseInt(value.category);
        const sum = parseFloat(value.sum);
        const description = <string>value.description;

        if (processedAt && category && sum) {
            this._store$.dispatch(
                fromOutcomeActions.addOutcome({
                    payload: new Outcome(
                        processedAt,
                        category,
                        sum,
                        description,
                    ),
                }),
            );
            form.reset();
        }
    }
}
