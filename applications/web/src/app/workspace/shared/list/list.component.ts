import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AppState } from "../../../store/app.model";
import { IIncome, Source } from "../../model/income.model";
import { IOutcome, Category } from "../../model/outcome.model";
import { Mode } from "../../workspace-routing.service";
import { ListService } from "./list.service";

import * as fromIncomeActions from "../../store/income.actions";
import * as fromOutcomeActions from "../../store/outcome.actions";

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
    public SOURCE = Source;
    public CATEGORY = Category;

    public incomes: IIncome[] = [];
    public outcomes: IOutcome[] = [];

    constructor(
        private _listService: ListService,
        private _store$: Store<AppState>,
    ) {}

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
        this._listService.openModal(
            income.id,
            Source[income.source],
            income.sum,
            fromIncomeActions.deleteIncome,
        );
    }

    public onOutcomeDelete(outcome: IOutcome): void {
        this._listService.openModal(
            outcome.id,
            Category[outcome.category],
            outcome.sum,
            fromOutcomeActions.deleteOutcome,
        );
    }
}
