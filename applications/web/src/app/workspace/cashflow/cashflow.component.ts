import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { Mode, RoutingService } from "../workspace-routing.service";
import { CashflowService } from "./cashflow.service";
import { IIncome, Source } from "../model/income.model";
import { Category, IOutcome } from "../model/outcome.model";

import * as _ from "lodash";
import * as fromApp from "../../store/app.state";
import * as fromIncomeActions from "../store/income.actions";
import * as fromOutcomeActions from "../store/outcome.actions";

@Component({
    templateUrl: "./cashflow.component.html",
    styleUrls: ["./cashflow.component.scss"],
})
export class CashflowComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;
    private _incomesSub!: Subscription;
    private _outcomesSub!: Subscription;

    public mode = Mode;
    public source = Source;
    public category = Category;

    public incomes: IIncome[] = [];
    public outcomes: IOutcome[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _cashflowService: CashflowService,
        private _store$: Store<fromApp.AppState>,
        public modeService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this._paramsSub = this._route.params.subscribe(params =>
            this.modeService.saveMode(params),
        );
        this._incomesSub = this._store$
            .select(fromApp.appSelectors.income.all)
            .subscribe(data => {
                this.incomes = _.takeRight(data, 2);
            });
        this._outcomesSub = this._store$
            .select(fromApp.appSelectors.outcome.all)
            .subscribe(data => {
                this.outcomes = _.takeRight(data, 2);
            });
    }

    public ngOnDestroy(): void {
        if (this._paramsSub) {
            this._paramsSub.unsubscribe();
        }
        if (this._incomesSub) {
            this._incomesSub.unsubscribe();
        }
        if (this._outcomesSub) {
            this._outcomesSub.unsubscribe();
        }
    }

    public onIncomeDelete(income: IIncome): void {
        this._cashflowService.openModal(
            income.id,
            Source[income.source],
            income.sum,
            fromIncomeActions.deleteIncome,
        );
    }

    public onOutcomeDelete(outcome: IOutcome): void {
        this._cashflowService.openModal(
            outcome.id,
            Category[outcome.category],
            outcome.sum,
            fromOutcomeActions.deleteOutcome,
        );
    }

    public onSubmit(form: NgForm): void {
        if (form.valid) {
            if (this.modeService.savedMode === Mode.Income) {
                this._cashflowService.addIncome(form);
            }
            if (this.modeService.savedMode === Mode.Outcome) {
                this._cashflowService.addOutcome(form);
            }
        }
    }
}
