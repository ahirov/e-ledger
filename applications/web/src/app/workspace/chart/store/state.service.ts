import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";

import { startOfYear, endOfYear } from "date-fns";
import * as _ from "lodash";

@Injectable()
export class StateService {
    public getChart<T, R>(
        year: number | null,
        items: Dictionary<T>,
        action: (items: T[], startedAt?: Date, endedAt?: Date) => R[],
        filterAction: (item: T, startedAt: Date, endedAt: Date) => boolean,
    ): R[] {
        if (year) {
            const filter = this.getFilter<T>(
                year,
                items,
                filterAction,
            );
            if (filter.items.length) {
                return action(filter.items, filter.startedAt, filter.endedAt);
            }
        }
        return [];
    }

    private getFilter<T>(
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
}
