import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { isValid, parse } from "date-fns";

import { IImportService } from "../model/import.model";
import { IIncome, Income, Source } from "../../data/model/income.model";
import { addIncomes, deleteIncomes } from "../../data/store/income.actions";
import * as _ from "lodash";

@Injectable()
export class ImportIncomeService implements IImportService<IIncome> {
    constructor(private _store$: Store) {}

    public processItems(
        data: any[],
        incomes?: Dictionary<IIncome>,
    ): { total: number; deleted: number } {
        let now = Date.now();
        const deleteIds: string[] = [];
        const items = _.map(data, item => {
            const from = parse(item.From, "dd/MM/yyyy", 0);
            const to = parse(item.To, "dd/MM/yyyy", 0);
            const source = Source[item.Source as keyof typeof Source];
            const sum = item.Sum as number;

            if (isValid(from) && isValid(to) && source && _.isFinite(sum)) {
                if (incomes) {
                    _(incomes)
                        .filter(
                            (item: IIncome): boolean =>
                                item.startedAt.getTime() === from.getTime() &&
                                item.endedAt.getTime() === to.getTime() &&
                                item.source === source,
                        )
                        .map((item: IIncome): string => item.id)
                        .forEach(id => deleteIds.push(id));
                }
                return new Income(from, to, source, sum, now--);
            } else {
                throw new Error();
            }
        });
        this.saveItems(items, deleteIds);
        return { total: items.length, deleted: deleteIds.length };
    }

    private saveItems(items: IIncome[], deleteIds: string[]) {
        if (deleteIds.length) {
            this._store$.dispatch(deleteIncomes({ payload: deleteIds }));
        }
        this._store$.dispatch(addIncomes({ payload: items }));
    }
}
