import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { IChartPoint, IChartSection } from "./model/chart.model";
import { Mode, RoutingService } from "../workspace-routing.service";

import { selectors as dataSelectors } from "../data/store/state.selectors";
import { selectors } from "./store/state.selectors";
import * as fromIncomeActions from "./store/income.actions";
import * as fromOutcomeActions from "./store/outcome.actions";

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
        object,
        IChartPoint[],
        DefaultProjectorFn<IChartPoint[]>
    > {
        return selectors.income.points;
    }

    public get incomeChartSectionsSelector(): MemoizedSelector<
        object,
        IChartSection[],
        DefaultProjectorFn<IChartSection[]>
    > {
        return selectors.income.sections;
    }

    public get outcomeChartPointsSelector(): MemoizedSelector<
        object,
        IChartPoint[],
        DefaultProjectorFn<IChartPoint[]>
    > {
        return selectors.outcome.points;
    }

    public get outcomeChartSectionsSelector(): MemoizedSelector<
        object,
        IChartSection[],
        DefaultProjectorFn<IChartSection[]>
    > {
        return selectors.outcome.sections;
    }

    constructor(
        private _route: ActivatedRoute,
        private _store$: Store,
        public modeService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this._paramsSub = this._route.params.subscribe(params =>
            this.modeService.saveMode(params),
        );
        this.incomeYear$ = this._store$.select(selectors.income.year);
        this.incomeYears$ = this._store$.select(dataSelectors.income.years);
        this.outcomeYear$ = this._store$.select(selectors.outcome.year);
        this.outcomeYears$ = this._store$.select(dataSelectors.outcome.years);
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
