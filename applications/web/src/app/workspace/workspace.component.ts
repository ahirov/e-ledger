import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { IIncomeData } from "./data/model/income.model";
import { IOutcomeData } from "./data/model/outcome.model";
import { Source } from "./adjustment/model/income.model";
import { Category } from "./adjustment/model/outcome.model";
import { getIncome, getOutcome } from "./workspace.temp";

import "../shared/extensions/number.extensions";
import "../shared/extensions/date.extensions";
import { selectors } from "./data/store/state.selectors";
import * as fromCommonActions from "./data/store/common.actions";
import * as fromIncomeActions from "./data/store/income.actions";
import * as fromOutcomeActions from "./data/store/outcome.actions";
import * as fromActions from "./adjustment/store/adjustment.actions";

@Component({
    templateUrl: "./workspace.component.html",
    styleUrls: ["./workspace.component.scss"],
})
export class WorkspaceComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;
    public isUnsaved = false;

    constructor(private _store$: Store) {}

    public ngOnInit(): void {
        this._sub = this._store$
            .select(selectors.isUnsaved)
            .subscribe(isUnsaved => {
                this.isUnsaved = isUnsaved;
            });

        /*////////////////// TEMP CODE!!! //////////////////*/
        let item = 0;
        let date = Date.now();
        const totalItems = 100;
        const incomes: IIncomeData[] = [];
        const outcomes: IOutcomeData[] = [];

        const intervalId = setInterval(() => {
            const income = <any>getIncome(item);
            income.createdAt = new Date(date);
            incomes.push(income);

            const outcome = <any>getOutcome(item);
            outcome.createdAt = new Date(date);
            outcomes.push(outcome);
            date++;
            item++;
            if (item === totalItems) {
                clearInterval(intervalId);
                this._store$.dispatch(
                    fromIncomeActions.addIncomes({ payload: incomes }),
                );
                this._store$.dispatch(
                    fromOutcomeActions.addOutcomes({ payload: outcomes }),
                );
                this._store$.dispatch(fromCommonActions.setSaved());
            }
        }, 1);
        const sources = [
            new Source(1, "Job"),
            new Source(2, "Deposit"),
            new Source(3, "Stolen"),
            new Source(4, "Business"),
            new Source(5, "Job2"),
            new Source(6, "Job3"),
            new Source(7, "Job4"),
            new Source(8, "Job5"),
            new Source(9, "Robbery"),
        ];
        const categories = [new Category(1, "Food"), new Category(2, "Sport")];
        this._store$.dispatch(
            fromActions.saveEnums({ payload: { sources, categories } }),
        );
        /*//////////////////////////////////////////////////*/
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }
}
