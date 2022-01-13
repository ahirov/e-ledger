import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Subscription } from "rxjs";
import { Source } from "../data/model/income.model";
import { Category } from "../data/model/outcome.model";
import { SummaryService } from "./summary.service";
import { Mode, RoutingService } from "../workspace-routing.service";

import { selectors } from "./store/state.selectors";

@Component({
    templateUrl: "./summary.component.html",
    styleUrls: ["./summary.component.scss"],
})
export class SummaryComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;
    private _incomeFiltersSub!: Subscription;
    private _outcomeFiltersSub!: Subscription;

    public MODE = Mode;
    public SOURCE = Source;
    public CATEGORY = Category;

    public startedAt: Date | null = null;
    public endedAt: Date | null = null;
    public source: Source | null = null;

    public processedAt: Date | null = null;
    public category: Category | null = null;
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
            .select(selectors.income.filter)
            .subscribe(data => {
                this.startedAt = data.startedAt;
                this.endedAt = data.endedAt;
                this.source = data.source;
            });
        this._outcomeFiltersSub = this._store$
            .select(selectors.outcome.filter)
            .subscribe(data => {
                this.processedAt = data.processedAt;
                this.category = data.category;
                this.description = data.description;
            });
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
                    this.startedAt,
                    this.endedAt,
                    this.source,
                );
            }
            if (this.modeService.savedMode === Mode.Outcome) {
                this._summaryService.setOutcomeFilter(
                    this.processedAt,
                    this.category,
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
