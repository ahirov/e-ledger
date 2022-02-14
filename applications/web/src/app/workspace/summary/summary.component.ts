import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { ISource } from "../adjustment/model/income.model";
import { ICategory } from "../adjustment/model/outcome.model";
import { SummaryService } from "./summary.service";
import { Mode, RoutingService } from "../workspace-routing.service";
import { selectors as dataSelectors } from "./store/state.selectors";
import { selectors } from "../adjustment/store/adjustment.selectors";

@Component({
    templateUrl: "./summary.component.html",
    styleUrls: ["./summary.component.scss"],
})
export class SummaryComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;
    private _incomeFiltersSub!: Subscription;
    private _outcomeFiltersSub!: Subscription;

    public MODE = Mode;
    public sources$!: Observable<ISource[]>;
    public categories$!: Observable<ICategory[]>;

    public from: Date | null = null;
    public to: Date | null = null;
    public sourceId: number | null = null;

    public date: Date | null = null;
    public categoryId: number | null = null;
    public description: string | null = null;

    constructor(
        private _route: ActivatedRoute,
        private _summaryService: SummaryService,
        private _store$: Store,
        public modeService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this._paramsSub = this._route.params.subscribe(params =>
            this.modeService.saveMode(params),
        );
        this._incomeFiltersSub = this._store$
            .select(dataSelectors.income.filter)
            .subscribe(data => {
                this.from = data.from;
                this.to = data.to;
                this.sourceId = data.sourceId;
            });
        this._outcomeFiltersSub = this._store$
            .select(dataSelectors.outcome.filter)
            .subscribe(data => {
                this.date = data.date;
                this.categoryId = data.categoryId;
                this.description = data.description;
            });
        this.sources$ = this._store$.select(selectors.sources);
        this.categories$ = this._store$.select(selectors.categories);
    }

    public ngOnDestroy(): void {
        if (this._paramsSub) {
            this._paramsSub.unsubscribe();
        }
        if (this._incomeFiltersSub) {
            this._incomeFiltersSub.unsubscribe();
        }
        if (this._outcomeFiltersSub) {
            this._outcomeFiltersSub.unsubscribe();
        }
    }

    public onSubmit(form: NgForm): void {
        if (form.valid) {
            if (this.modeService.savedMode === Mode.Income) {
                this._summaryService.setIncomeFilter(
                    this.from,
                    this.to,
                    this.sourceId,
                );
            }
            if (this.modeService.savedMode === Mode.Outcome) {
                this._summaryService.setOutcomeFilter(
                    this.date,
                    this.categoryId,
                    this.description,
                );
            }
        }
    }

    public onReset(form: NgForm) {
        form.reset();
        this.onSubmit(form);
    }
}
