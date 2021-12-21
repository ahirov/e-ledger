import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { Subscription } from "rxjs";

import { IIncome, Source } from "../model/income.model";
import { Category, IOutcome } from "../model/outcome.model";
import { Mode, RoutingService } from "../workspace-routing.service";
import { CashflowService } from "./cashflow.service";
import { appSelectors as selectors } from "../../store/app.state";

@Component({
    templateUrl: "./cashflow.component.html",
    styleUrls: ["./cashflow.component.scss"],
})
export class CashflowComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;

    public MODE = Mode;
    public SOURCE = Source;
    public CATEGORY = Category;

    public get incomesSelector(): MemoizedSelector<
        object,
        IIncome[],
        DefaultProjectorFn<IIncome[]>
    > {
        return selectors.income.previewItems;
    }

    public get outcomesSelector(): MemoizedSelector<
        object,
        IOutcome[],
        DefaultProjectorFn<IOutcome[]>
    > {
        return selectors.outcome.previewItems;
    }

    constructor(
        private _route: ActivatedRoute,
        private _cashflowService: CashflowService,
        public modeService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this._paramsSub = this._route.params.subscribe(params =>
            this.modeService.saveMode(params),
        );
    }

    public ngOnDestroy(): void {
        if (this._paramsSub) {
            this._paramsSub.unsubscribe();
        }
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
