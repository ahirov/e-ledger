import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";

import { IIncome, Source } from "../../data/model/income.model";
import { IExportFilter, IExportService } from "../model/export.model";
import { Extension } from "../model/extension.mode";
import { utils, WorkSheet } from "xlsx";
import * as _ from "lodash";

@Injectable()
export class ExportIncomeService implements IExportService<IIncome> {
    public getItems(
        filter: IExportFilter,
        items: Dictionary<IIncome>,
    ): IIncome[] {
        return <IIncome[]>_(items)
            .filter(
                (item: IIncome): boolean =>
                    filter.from <= item.endedAt && filter.to >= item.startedAt,
            )
            .orderBy((item: IIncome): Date => item.startedAt, "desc")
            .value();
    }

    public getWorkSheet(filter: IExportFilter, items: IIncome[]): WorkSheet {
        const header = ["From", "To", "Source", "Sum"];
        const columns = _.map(items, item => {
            return [
                item.startedAt.toFullDateString(),
                item.endedAt.toFullDateString(),
                Source[item.source],
                item.sum,
            ];
        });
        columns.unshift(header);
        const ws = utils.aoa_to_sheet(columns);
        if (filter.extension == Extension.Xlsx) {
            var wscols = [{ wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 8 }];
            ws["!cols"] = wscols;
        }
        return ws;
    }
}
