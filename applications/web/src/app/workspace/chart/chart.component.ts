import { Component, OnInit } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { ModeService } from "../workspace-mode.service";
import { IChartPoint, IChartSection } from "./model/chart.model";
import { selectors as dataSelectors } from "../data/store/state.selectors";
import { selectors } from "./store/state.selectors";
import * as fromIncomeActions from "./store/income.actions";
import * as fromOutcomeActions from "./store/outcome.actions";

@Component({
    templateUrl: "./chart.component.html",
    styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
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

    constructor(private _store$: Store, private _modeService: ModeService) {}

    public ngOnInit(): void {
        this.incomeYear$ = this._store$.select(selectors.income.year);
        this.incomeYears$ = this._store$.select(dataSelectors.income.years);
        this.outcomeYear$ = this._store$.select(selectors.outcome.year);
        this.outcomeYears$ = this._store$.select(dataSelectors.outcome.years);
        this.chartMode = "period";
    }

    public onIncomeYearSelect(year: number): void {
        this._store$.dispatch(fromIncomeActions.setYear({ payload: year }));
    }

    public onOutcomeYearSelect(year: number): void {
        this._store$.dispatch(fromOutcomeActions.setYear({ payload: year }));
    }

    public isIncome(): boolean {
        return this._modeService.isIncome();
    }

    public isOutcome(): boolean {
        return this._modeService.isOutcome();
    }
}
