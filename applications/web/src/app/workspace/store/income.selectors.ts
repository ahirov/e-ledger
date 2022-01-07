import { getOverlappingDaysInIntervals, eachDayOfInterval } from "date-fns";
import { getChart } from "./state.selectors";
import { IIncome, Source } from "../model/income.model";
import {
    Item,
    ChartPoint,
    ChartSection,
    IItem,
    IChartPoint,
    IChartSection,
} from "../model/state.model";

import * as fromReducer from "./income.reducer";
import * as _ from "lodash";

export const selectors = {
    chartPoints: (state: fromReducer.State): IChartPoint[] => {
        return getChart(state, getPointsAction, getFilterAction);
    },
    chartSections: (state: fromReducer.State): IChartSection[] => {
        return getChart(state, getSectionsAction, getFilterAction);
    },
};

function getFilterAction(
    item: IIncome,
    startedAt: Date,
    endedAt: Date,
): boolean {
    return startedAt <= item.endedAt && endedAt >= item.startedAt;
}

function getPointsAction(
    items: IIncome[],
    startedAt: Date,
    endedAt: Date,
): IChartPoint[] {
    const days = eachDayOfInterval({ start: startedAt, end: endedAt });
    return _.map(getDaySumSet(days, items), item => {
        return new ChartPoint(item.key.toDayShortMonthString(), item.value);
    });
}

function getSectionsAction(
    items: IIncome[],
    startedAt: Date,
    endedAt: Date,
): IChartSection[] {
    const sections = _(getSourceSumSet(startedAt, endedAt, items))
        .groupBy(item => item.key)
        .map((items, key) => {
            return new Item(
                Source[parseInt(key)],
                _.sumBy(items, item => item.value),
            );
        });
    const total = sections.sumBy(item => item.value);
    return sections
        .map(item => {
            return new ChartSection(
                item.key,
                (item.value / total) * 100,
                item.value,
            );
        })
        .value();
}

function getDaySumSet(days: Date[], items: IIncome[]): IItem<Date>[] {
    const set: Item<Date>[] = [];
    for (const day of days) {
        const dayItems = _(items).filter(
            item => day >= item.startedAt && day <= item.endedAt,
        );
        set.push(
            new Item(
                day,
                dayItems.sumBy(item => item.sumPerDay),
            ),
        );
    }
    return set;
}

function getSourceSumSet(
    startedAt: Date,
    endedAt: Date,
    items: IIncome[],
): IItem<Source>[] {
    const set: Item<Source>[] = [];
    for (const item of items) {
        const days = getOverlappingDaysInIntervals(
            { start: startedAt, end: endedAt },
            { start: item.startedAt, end: item.endedAt },
        ) + 1;
        set.push(new Item(item.source, days * item.sumPerDay));
    }
    return set;
}
