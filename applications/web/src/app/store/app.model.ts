import { Dictionary } from "@ngrx/entity";
import { MemoizedSelector } from "@ngrx/store";

import { ChartPoint, ChartSection } from "../workspace/model/state.model";
import * as fromAuth from "../auth/store/auth.reducer";
import * as fromIncome from "../workspace/store/income.reducer";
import * as fromOutcome from "../workspace/store/outcome.reducer";

export interface AppState {
    auth: fromAuth.State;
    income: fromIncome.State;
    outcome: fromOutcome.State;
}

export interface AppSelector<T, F> {
    items: MemoizedSelector<AppState, Dictionary<T>>;
    summaryActivePage: MemoizedSelector<AppState, number>;
    summaryPagesCount: MemoizedSelector<AppState, number>;
    summaryPageItems:  MemoizedSelector<AppState, T[]>;
    previewItems:      MemoizedSelector<AppState, T[]>;
    summaryItemsCount: MemoizedSelector<AppState, number>;
    summaryFilter:     MemoizedSelector<AppState, F>;
    chartYear:         MemoizedSelector<AppState, number | null>;
    chartYears:        MemoizedSelector<AppState, number[]>;
    chartPoints:       MemoizedSelector<AppState, ChartPoint[]>;
    chartSections:     MemoizedSelector<AppState, ChartSection[]>;
}
