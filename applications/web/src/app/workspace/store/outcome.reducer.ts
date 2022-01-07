import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import {
    IOutcome,
    IOutcomeFilter,
    OutcomeFilter,
} from "../model/outcome.model";
import { IState } from "../model/state.model";

import * as fromActions from "./outcome.actions";
import * as _ from "lodash";

export interface State extends IState<IOutcome, IOutcomeFilter> {}

const adapter: EntityAdapter<IOutcome> = createEntityAdapter<IOutcome>({
    selectId: (outcome: IOutcome) => outcome.id,
    sortComparer: false,
});

const initialState: State = adapter.getInitialState({
    summaryActivePage: 0,
    summaryIds: [],
    summaryFilter: new OutcomeFilter(),
    chartYear: null,
    chartYears: [],
});

export const outcomeReducer = createReducer(
    initialState,
    on(fromActions.addOutcome, (state, { payload }): State => {
        /* TODO!!! */
        const ids = [...state.summaryIds];
        if (state.summaryFilter.process(payload)) {
            ids.unshift(payload.id);
        }
        return adapter.addOne(payload, {
            ...state,
            summaryIds: ids,
            chartYears: _([...state.chartYears])
                .push(payload.processedAt.getFullYear())
                .uniq()
                .orderBy(item => item, "desc")
                .value(),
        });
    }),
    on(fromActions.addOutcomes, (state, { payload }): State => {
        /* TODO!!! */
        const years: number[] = [];
        _(payload).forEach(item => years.push(item.processedAt.getFullYear()));
        return adapter.addMany(payload, {
            ...state,
            chartYears: _([...state.chartYears])
                .push(...years)
                .uniq()
                .orderBy(item => item, "desc")
                .value(),
        });
    }),
    on(fromActions.deleteOutcome, (state, { payload }): State => {
        /* TODO!!! */
        const income = _.find(
            state.entities,
            (item: IOutcome) => item.id === payload,
        );
        let removedYear: number | null = null;
        if (income) {
            if (
                !_.some(
                    state.entities,
                    (item: IOutcome): boolean =>
                        income.id != item.id &&
                        income.processedAt.getFullYear() ===
                            item.processedAt.getFullYear(),
                )
            ) {
                removedYear = income.processedAt.getFullYear();
            }
        }
        const chartYear =
            removedYear === state.chartYear ? null : state.chartYear;
        return adapter.removeOne(payload, {
            ...state,
            summaryIds: _.filter(state.summaryIds, item => item !== payload),
            chartYears: _.filter(
                state.chartYears,
                item => item !== removedYear,
            ),
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
