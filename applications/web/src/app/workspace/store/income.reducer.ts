import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { eachYearOfInterval } from "date-fns";

import { IIncome, IIncomeFilter, IncomeFilter } from "../model/income.model";
import { IState } from "../model/state.model";

import * as fromActions from "./income.actions";
import * as _ from "lodash";

export interface State extends IState<IIncome, IIncomeFilter> {}

const adapter: EntityAdapter<IIncome> = createEntityAdapter<IIncome>({
    selectId: (income: IIncome) => income.id,
    sortComparer: false,
});

const initialState: State = adapter.getInitialState({
    summaryActivePage: 0,
    summaryIds: [],
    summaryFilter: new IncomeFilter(),
    chartYear: null,
    chartYears: [],
});

export const incomeReducer = createReducer(
    initialState,
    on(fromActions.addIncome, (state, { payload }): State => {
        /* TODO!!! */
        const ids = [...state.summaryIds];
        if (state.summaryFilter.process(payload)) {
            ids.unshift(payload.id);
        }
        const years = _(
            eachYearOfInterval({
                start: payload.startedAt,
                end: payload.endedAt,
            }),
        )
            .map(item => item.getFullYear())
            .value();
        return adapter.addOne(payload, {
            ...state,
            summaryIds: ids,
            chartYears: _([...state.chartYears])
                .push(...years)
                .uniq()
                .orderBy(item => item, "desc")
                .value(),
        });
    }),
    on(fromActions.addIncomes, (state, { payload }): State => {
        /* TODO!!! */
        const years: number[] = [];
        _(payload).forEach(item =>
            years.push(
                ...eachYearOfInterval({
                    start: item.startedAt,
                    end: item.endedAt,
                }).map(item => item.getFullYear()),
            ),
        );
        return adapter.addMany(payload, {
            ...state,
            chartYears: _([...state.chartYears])
                .push(...years)
                .uniq()
                .orderBy(item => item, "desc")
                .value(),
        });
    }),
    on(fromActions.deleteIncome, (state, { payload }): State => {
        /* TODO!!! */
        const income = _.find(
            state.entities,
            (item: IIncome) => item.id === payload,
        );
        let removedYears: _.Collection<number> = _<number>([]);
        if (income) {
            removedYears = _(
                eachYearOfInterval({
                    start: income.startedAt,
                    end: income.endedAt,
                }),
            )
                .map(date => date.getFullYear())
                .filter(
                    year =>
                        !_.some(
                            state.entities,
                            (item: IIncome): boolean =>
                                income.id != item.id &&
                                year >= item.startedAt.getFullYear() &&
                                year <= item.endedAt.getFullYear(),
                        ),
                );
        }
        const chartYear = removedYears.some(item => item === state.chartYear)
            ? null
            : state.chartYear;
        return adapter.removeOne(payload, {
            ...state,
            summaryIds: _.filter(state.summaryIds, item => item !== payload),
            chartYears: _.difference(state.chartYears, removedYears.value()),
            chartYear: chartYear,
        });
    }),
    on(fromActions.setPage, (state, { payload }): State => {
        return { ...state, summaryActivePage: payload };
    }),
    on(fromActions.setYear, (state, { payload }): State => {
        return { ...state, chartYear: payload };
    }),
    on(fromActions.setFilter, (state, { payload }): State => {
        return { ...state, summaryFilter: payload };
    }),
    on(fromActions.setOutput, (state, { payload }): State => {
        return { ...state, summaryIds: payload };
    }),
);
