import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";
import { eachYearOfInterval } from "date-fns";

import { IIncome } from "../model/income.model";
import * as _ from "lodash";

@Injectable()
export class IncomeService {
    public getYears(
        newItems: IIncome[],
        allItems: Dictionary<IIncome>,
        allYears: number[],
    ): number[] {
        const years: number[] = [];
        if (newItems.length) {
            _(newItems).forEach(item => this.processItem(item, years));
            years.push(...allYears);
        } else {
            _(allItems).forEach(item => {
                if (item) {
                    this.processItem(item, years);
                }
            });
        }
        return _(years)
            .uniq()
            .orderBy(item => item, "desc")
            .value();
    }

    private processItem(item: IIncome, years: number[]): void {
        years.push(
            ...eachYearOfInterval({
                start: item.startedAt,
                end: item.endedAt,
            }).map(item => item.getFullYear()),
        );
    }
}
