import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { AppState } from "../../store/app.model";
import { ChartPoint, ChartSection } from "../model/state.model";
import { Mode, RoutingService } from "../workspace-routing.service";
import { appSelectors as selectors } from "../../store/app.state";

import * as fromIncomeActions from "../store/income.actions";
import * as fromOutcomeActions from "../store/outcome.actions";

@Component({
    templateUrl: "./chart.component.html",
    styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;

    public MODE = Mode;
    public chartMode!: "period" | "section";
    public incomeYear$!: Observable<number | null>;
    public incomeYears$!: Observable<number[]>;
    public outcomeYear$!: Observable<number | null>;
    public outcomeYears$!: Observable<number[]>;

    public get incomeChartPointsSelector(): MemoizedSelector<
        AppState,
        ChartPoint[],
        DefaultProjectorFn<ChartPoint[]>
    > {
        return selectors.income.chartPoints;
    }

    public get incomeChartSectionsSelector(): MemoizedSelector<
        AppState,
        ChartSection[],
        DefaultProjectorFn<ChartSection[]>
    > {
        return selectors.income.chartSections;
    }

    public get outcomeChartPointsSelector(): MemoizedSelector<
        AppState,
        ChartPoint[],
        DefaultProjectorFn<ChartPoint[]>
    > {
        return selectors.outcome.chartPoints;
    }

    public get outcomeChartSectionsSelector(): MemoizedSelector<
        AppState,
        ChartSection[],
        DefaultProjectorFn<ChartSection[]>
    > {
        return selectors.outcome.chartSections;
    }

    constructor(
        private _route: ActivatedRoute,
        private _store$: Store<AppState>,
        public modeService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this._paramsSub = this._route.params.subscribe(params =>
            this.modeService.saveMode(params),
        );
        this.incomeYear$ = this._store$.select(selectors.income.chartYear);
        this.incomeYears$ = this._store$.select(selectors.income.chartYears);
        this.outcomeYear$ = this._store$.select(selectors.outcome.chartYear);
        this.outcomeYears$ = this._store$.select(selectors.outcome.chartYears);
        this.chartMode = "period";
    }

    public ngOnDestroy(): void {
        if (this._paramsSub) {
            this._paramsSub.unsubscribe();
        }
    }

    public onIncomeYearSelect(year: number): void {
        this._store$.dispatch(fromIncomeActions.setYear({ payload: year }));
    }

    public onOutcomeYearSelect(year: number): void {
        this._store$.dispatch(fromOutcomeActions.setYear({ payload: year }));
    }
}
