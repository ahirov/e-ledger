import { NgForm } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { IIncome } from "../data/model/income.model";
import { IOutcome } from "../data/model/outcome.model";
import { ISource } from "../adjustment/model/income.model";
import { ICategory } from "../adjustment/model/outcome.model";

import { CashflowService } from "./cashflow.service";
import { ModeService } from "../workspace-mode.service";
import { environment } from "applications/web/src/environments/environment";
import { selectors as dataSelectors } from "../data/store/state.selectors";
import { selectors } from "../adjustment/store/adjustment.selectors";

@Component({
    templateUrl: "./cashflow.component.html",
    styleUrls: ["./cashflow.component.scss"],
})
export class CashflowComponent implements OnInit, OnDestroy {
    private _sub!: Subscription;
    public formSubmitted!: boolean;
    public sources$!: Observable<ISource[]>;
    public categories$!: Observable<ICategory[]>;
    public descriptionMaxLength = environment.descriptionMaxLength;
    public sumMaxValue = environment.sumMaxValue;

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
        private _cashflowService: CashflowService,
        private _modeService: ModeService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this.formSubmitted = false;
        this._sub = this._modeService.cashflowModes.subscribe(_mode => {
            this.formSubmitted = false;
        });
        this.sources$ = this._store$.select(selectors.sources);
        this.categories$ = this._store$.select(selectors.categories);
    }

    public ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public onSubmit(form: NgForm): void {
        this.formSubmitted = true;
        form.control.markAllAsTouched();
        if (this.isIncome()) {
            form.controls.from.markAsDirty();
            form.controls.to.markAsDirty();
            if (form.valid) {
                this._cashflowService.addIncome(form);
                this.formSubmitted = false;
            }
        }
        if (this.isOutcome()) {
            form.controls.date.markAsDirty();
            if (form.valid) {
                this._cashflowService.addOutcome(form);
                this.formSubmitted = false;
            }
        }
    }

    public onClear(form: NgForm): void {
        form.reset();
        this.formSubmitted = false;
    }

    public isIncome(): boolean {
        return this._modeService.isIncome();
    }

    public isOutcome(): boolean {
        return this._modeService.isOutcome();
    }
}
