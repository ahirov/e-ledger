import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { IIncome, Source } from "../model/income.model";
import { IOutcome, Category } from "../model/outcome.model";
import { Mode } from "../workspace-routing.service";
import { ListService } from "./list.service";

import * as fromIncomeActions from "../store/income.actions";
import * as fromOutcomeActions from "../store/outcome.actions";
import * as fromApp from "../../store/app.state";
import * as _ from "lodash";

@Component({
    selector: "el-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
    private _incomesSub!: Subscription;
    private _outcomesSub!: Subscription;

    @Input("showItems")
    public showItems?: number;
    @Input("mode")
    public currentMode!: Mode;

    public mode = Mode;
    public source = Source;
    public category = Category;

    public incomes: IIncome[] = [];
    public outcomes: IOutcome[] = [];

    constructor(
        private _listService: ListService,
        private _store$: Store<fromApp.AppState>,
    ) {}

    public ngOnInit(): void {
        this._incomesSub = this._store$
            .select(fromApp.appSelectors.income.all)
            .subscribe(data => {
                this.incomes = this.showItems
                    ? _.takeRight(data, this.showItems)
                    : data;
            });
        this._outcomesSub = this._store$
            .select(fromApp.appSelectors.outcome.all)
            .subscribe(data => {
                this.outcomes = this.showItems
                    ? _.takeRight(data, this.showItems)
                    : data;
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
