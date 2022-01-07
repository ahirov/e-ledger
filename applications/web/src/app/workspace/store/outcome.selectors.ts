import { eachMonthOfInterval } from "date-fns";
import { getChart } from "./state.selectors";
import { Category, IOutcome } from "../model/outcome.model";
import {
    ChartPoint,
    ChartSection,
    IChartPoint,
    IChartSection,
    IItem,
    Item,
} from "../model/state.model";

import * as fromReducer from "./outcome.reducer";
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
    item: IOutcome,
    startedAt: Date,
    endedAt: Date,
): boolean {
    return item.processedAt >= startedAt && item.processedAt <= endedAt;
}

function getPointsAction(
    items: IOutcome[],
    startedAt: Date,
    endedAt: Date,
): IChartPoint[] {
    const monts = eachMonthOfInterval({ start: startedAt, end: endedAt });
    return _.map(getMonthSumSet(monts, items), item => {
        return new ChartPoint(item.key.toShortMonthString(), item.value);
    });
}

function getSectionsAction(items: IOutcome[]): IChartSection[] {
    const sections = _(getCategorySumSet(items))
        .groupBy(item => item.key)
        .map((items, key) => {
            return new Item(
                Category[parseInt(key)],
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

function getMonthSumSet(months: Date[], items: IOutcome[]): IItem<Date>[] {
    const set: Item<Date>[] = [];
    for (const month of months) {
        const monthItems = _(items).filter(
            item =>
                month.getFullYear() === item.processedAt.getFullYear() &&
                month.getMonth() === item.processedAt.getMonth(),
        );
        set.push(
            new Item(
                month,
                monthItems.sumBy(item => item.sum),
            ),
        );
    }
    return set;
}

function getCategorySumSet(items: IOutcome[]): IItem<Category>[] {
    const set: Item<Category>[] = [];
    for (const item of items) {
        set.push(new Item(item.category, item.sum));
    }
    return set;
}
