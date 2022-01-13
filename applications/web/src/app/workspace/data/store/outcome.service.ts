import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";

import { IOutcome } from "../model/outcome.model";
import * as _ from "lodash";

@Injectable()
export class OutcomeService {
    public getYears(
        newItems: IOutcome[],
        allItems: Dictionary<IOutcome>,
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

    private processItem(item: IOutcome, years: number[]): void {
        years.push(item.processedAt.getFullYear());
    }
}
