import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { isValid, parse } from "date-fns";

import { IImportService } from "../model/import.model";
import { Category, IOutcome, Outcome } from "../../data/model/outcome.model";
import { addOutcomes, deleteOutcomes } from "../../data/store/outcome.actions";
import * as _ from "lodash";

@Injectable()
export class ImportOutcomeService implements IImportService<IOutcome> {
    constructor(private _store$: Store) {}

    public processItems(
        data: any[],
        outcomes?: Dictionary<IOutcome>,
    ): { total: number; deleted: number } {
        let now = Date.now();
        const deleteIds: string[] = [];
        const items = _.map(data, item => {
            const date = parse(item.Date, "dd/MM/yyyy", 0);
            const category = Category[item.Category as keyof typeof Category];
            const sum = item.Sum as number;
            const description = item.Description as string;

            if (
                isValid(date) &&
                category &&
                _.isFinite(sum) &&
                (!description || _.isString(description))
            ) {
                if (outcomes) {
                    _(outcomes)
                        .filter(
                            (item: IOutcome): boolean =>
                                item.date.getTime() === date.getTime() &&
                                item.category === category,
                        )
                        .map((item: IOutcome): string => item.id)
                        .forEach(id => deleteIds.push(id));
                }
                return new Outcome(date, category, sum, description, now--);
            } else {
                throw new Error();
            }
        });
        this.saveItems(items, deleteIds);
        return { total: items.length, deleted: deleteIds.length };
    }

    private saveItems(items: IOutcome[], deleteIds: string[]) {
        if (deleteIds.length) {
            this._store$.dispatch(deleteOutcomes({ payload: deleteIds }));
        }
        this._store$.dispatch(addOutcomes({ payload: items }));
    }
}
