import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { IIncome } from "../data/model/income.model";
import { IOutcome } from "../data/model/outcome.model";
import { ISource } from "../adjustment/model/income.model";
import { ICategory } from "../adjustment/model/outcome.model";
import { CashflowService } from "./cashflow.service";
import { Mode, RoutingService } from "../workspace-routing.service";
import { selectors as dataSelectors } from "../data/store/state.selectors";
import { selectors } from "../adjustment/store/adjustment.selectors";

@Component({
    templateUrl: "./cashflow.component.html",
    styleUrls: ["./cashflow.component.scss"],
})
export class CashflowComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;

    @ViewChild("elCashflowForm")
    private _form!: NgForm;

    public MODE = Mode;
    public sources$!: Observable<ISource[]>;
    public categories$!: Observable<ICategory[]>;

    public get incomesSelector(): MemoizedSelector<
        object,
        IIncome[],
        DefaultProjectorFn<IIncome[]>
    > {
        return dataSelectors.income.previewItems;
    }

    public get outcomesSelector(): MemoizedSelector<
        object,
        IOutcome[],
        DefaultProjectorFn<IOutcome[]>
    > {
        return dataSelectors.outcome.previewItems;
    }

    constructor(
        private _route: ActivatedRoute,
        private _cashflowService: CashflowService,
        private _store$: Store,
        public modeService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this._paramsSub = this._route.params.subscribe(params => {
            this.modeService.saveMode(params);
            if (this._form) {
                this._form.reset();
            }
        });
        this.sources$ = this._store$.select(selectors.sources);
        this.categories$ = this._store$.select(selectors.categories);
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
