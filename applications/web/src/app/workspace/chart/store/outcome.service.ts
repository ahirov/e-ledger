import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";
import { eachMonthOfInterval } from "date-fns";

import { Category, IOutcome } from "../../data/model/outcome.model";
import { StateService } from "./state.service";
import {
    ChartPoint,
    ChartSection,
    IChartPoint,
    IChartSection,
    IItem,
    Item,
} from "../chart.model";
import * as _ from "lodash";

@Injectable()
export class OutcomeService {
    constructor(private _stateService: StateService) {}

    public getPoints(
        year: number | null,
        items: Dictionary<IOutcome>,
    ): IChartPoint[] {
        return this._stateService.getChart(
            year,
            items,
            this.getPointsAction.bind(this),
            this.getFilterAction,
        );
    }

    public getSections(
        year: number | null,
        items: Dictionary<IOutcome>,
    ): IChartSection[] {
        return this._stateService.getChart(
            year,
            items,
            this.getSectionsAction.bind(this),
            this.getFilterAction,
        );
    }

    private getFilterAction(
        item: IOutcome,
        startedAt: Date,
        endedAt: Date,
    ): boolean {
        return item.processedAt >= startedAt && item.processedAt <= endedAt;
    }

    private getPointsAction(
        items: IOutcome[],
        startedAt: Date,
        endedAt: Date,
    ): IChartPoint[] {
        const monts = eachMonthOfInterval({ start: startedAt, end: endedAt });
        return _.map(this.getMonthSumSet(monts, items), item => {
            return new ChartPoint(item.key.toShortMonthString(), item.value);
        });
    }

    private getSectionsAction(items: IOutcome[]): IChartSection[] {
        const sections = _(this.getCategorySumSet(items))
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

    private getMonthSumSet(months: Date[], items: IOutcome[]): IItem<Date>[] {
        const set: IItem<Date>[] = [];
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

    private getCategorySumSet(items: IOutcome[]): IItem<Category>[] {
        const set: IItem<Category>[] = [];
        for (const item of items) {
            set.push(new Item(item.category, item.sum));
        }
        return set;
    }
}
