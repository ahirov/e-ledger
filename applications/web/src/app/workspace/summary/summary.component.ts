import { NgForm } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { ISource } from "../adjustment/model/income.model";
import { ICategory } from "../adjustment/model/outcome.model";
import { SummaryService } from "./summary.service";
import { ModeService } from "../workspace-mode.service";
import { selectors as dataSelectors } from "./store/state.selectors";
import { selectors } from "../adjustment/store/adjustment.selectors";

@Component({
    templateUrl: "./summary.component.html",
    styleUrls: ["./summary.component.scss"],
})
export class SummaryComponent implements OnInit, OnDestroy {
    private _incomeFiltersSub!: Subscription;
    private _outcomeFiltersSub!: Subscription;

    public sources$!: Observable<ISource[]>;
    public categories$!: Observable<ICategory[]>;

    public incomeFrom: Date | null = null;
    public incomeTo: Date | null = null;
    public sourceId: number | null = null;

    public outcomeFrom: Date | null = null;
    public outcomeTo: Date | null = null;
    public categoryId: number | null = null;

    constructor(
        private _summaryService: SummaryService,
        private _modeService: ModeService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this._incomeFiltersSub = this._store$
            .select(dataSelectors.income.filter)
            .subscribe(data => {
                this.incomeFrom = data.from;
                this.incomeTo = data.to;
                this.sourceId = data.sourceId;
            });
        this._outcomeFiltersSub = this._store$
            .select(dataSelectors.outcome.filter)
            .subscribe(data => {
                this.outcomeFrom = data.from;
                this.outcomeTo = data.to;
                this.categoryId = data.categoryId;
            });
        this.sources$ = this._store$.select(selectors.sources);
        this.categories$ = this._store$.select(selectors.categories);
    }

    public ngOnDestroy(): void {
        if (this._incomeFiltersSub) {
            this._incomeFiltersSub.unsubscribe();
        }
        if (this._outcomeFiltersSub) {
            this._outcomeFiltersSub.unsubscribe();
        }
    }

    public onSubmit(form: NgForm): void {
        if (form.valid) {
            if (this.isIncome()) {
                this._summaryService.setIncomeFilter(
                    this.incomeFrom,
                    this.incomeTo,
                    this.sourceId,
                );
            }
            if (this.isOutcome()) {
                this._summaryService.setOutcomeFilter(
                    this.outcomeFrom,
                    this.outcomeTo,
                    this.categoryId,
                );
            }
        }
    }

    public onClear(form: NgForm) {
        form.reset();
        this.onSubmit(form);
    }

    public isIncome(): boolean {
        return this._modeService.isIncome();
    }

    public isOutcome(): boolean {
        return this._modeService.isOutcome();
    }
}
