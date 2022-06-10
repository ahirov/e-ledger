import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { ListService } from "./list.service";
import { Mode } from "../../workspace-routing.service";
import { IIncome } from "../../data/model/income.model";
import { IOutcome } from "../../data/model/outcome.model";

import { environment } from "applications/web/src/environments/environment";
import * as fromIncomeActions from "../../data/store/income.actions";
import * as fromOutcomeActions from "../../data/store/outcome.actions";

@Component({
    selector: "el-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
    private _incomesSub!: Subscription;
    private _outcomesSub!: Subscription;

    @Input()
    public mode!: Mode;
    @Input()
    public incomesSelector!: MemoizedSelector<
        object,
        IIncome[],
        DefaultProjectorFn<IIncome[]>
    >;
    @Input()
    public outcomesSelector!: MemoizedSelector<
        object,
        IOutcome[],
        DefaultProjectorFn<IOutcome[]>
    >;

    public MODE = Mode;
    public incomes: IIncome[] = [];
    public outcomes: IOutcome[] = [];
    public truncateLength = environment.truncateLength;

    constructor(private _listService: ListService, private _store$: Store) {}

    public ngOnInit(): void {
        this._incomesSub = this._store$
            .select(this.incomesSelector)
            .subscribe(data => {
                this.incomes = data;
            });
        this._outcomesSub = this._store$
            .select(this.outcomesSelector)
            .subscribe(data => {
                this.outcomes = data;
            });
    }

    public ngOnDestroy(): void {
        if (this._incomesSub) {
            this._incomesSub.unsubscribe();
        }
        if (this._outcomesSub) {
            this._outcomesSub.unsubscribe();
        }
    }

    public onIncomeDelete(income: IIncome): void {
        this._listService.openDialog(
            income.id,
            income.sum,
            income.source.name,
            fromIncomeActions.deleteIncome,
        );
    }

    public onOutcomeDelete(outcome: IOutcome): void {
        this._listService.openDialog(
            outcome.id,
            outcome.sum,
            outcome.category.name,
            fromOutcomeActions.deleteOutcome,
        );
    }
}
