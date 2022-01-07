import { Dictionary } from "@ngrx/entity";
import { startOfYear, endOfYear } from "date-fns";

import { IState } from "../model/state.model";
import { environment } from "applications/web/src/environments/environment";
import * as _ from "lodash";

const itemsPerPage = environment.pageItemsCount;
export const selectors = {
    items: <T, F>(state: IState<T, F>): Dictionary<T> => state.entities,
    previewItems: <T, F>(state: IState<T, F>): T[] => {
        const ids = _.takeRight(
            <string[]>state.ids,
            environment.pagePreviewItemsCount,
        );
        return _.map(ids, id => <T>state.entities[id]);
    },
    summaryItemsCount: <T, F>(state: IState<T, F>): number => state.summaryIds.length,
    summaryActivePage: <T, F>(state: IState<T, F>): number => state.summaryActivePage,
    summaryPagesCount: <T, F>(state: IState<T, F>): number =>
        _.ceil(state.summaryIds.length / itemsPerPage),
    summaryPageItems: <T, F>(state: IState<T, F>): T[] => {
        const start = state.summaryActivePage * itemsPerPage;
        const end = start + itemsPerPage;
        const ids = _.slice(state.summaryIds, start, end);
        return _.map(ids, id => <T>state.entities[id]);
    },
    summaryFilter: <T, F>(state: IState<T, F>): F => state.summaryFilter,
    chartYears: <T, F>(state: IState<T, F>): number[] => state.chartYears,
    chartYear: <T, F>(state: IState<T, F>): number | null => state.chartYear,
};

export function getChart<T, F, R>(
    state: IState<T, F>,
    action: (items: T[], startedAt?: Date, endedAt?: Date) => R[],
    filterAction: (item: T, startedAt: Date, endedAt: Date) => boolean,
): R[] {
    const year = state.chartYear;
    if (year) {
        const filter = getFilter<T>(year, state.entities, filterAction);
        if (filter.items.length) {
            return action(filter.items, filter.startedAt, filter.endedAt);
        }
    }
    return [];
}

function getFilter<T>(
    year: number,
    items: Dictionary<T>,
    filterAction: (item: T, startedAt: Date, endedAt: Date) => boolean,
): { items: T[]; startedAt: Date; endedAt: Date } {
    const startedAt = startOfYear(new Date(year, 0));
    const endedAt = endOfYear(new Date(year, 11));

    return {
        items: <T[]>_.filter(items, (item: T): boolean => {
            return filterAction(item, startedAt, endedAt);
        }),
        startedAt,
        endedAt,
    };
}
