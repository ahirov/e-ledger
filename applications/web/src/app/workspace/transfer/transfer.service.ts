import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Dictionary } from "@ngrx/entity";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { map, take, tap } from "rxjs/operators";

import {
    ExportFilter,
    IExportFilter,
    IExportService,
} from "./model/export.model";
import { Extension } from "./model/extension.mode";
import { Mode } from "../workspace-routing.service";
import { ExportIncomeService } from "./export/export-income.service";
import { ExportOutcomeService } from "./export/export-outcome.service";
import { selectors as dataSelectors } from "../data/store/state.selectors";
import { writeFile, utils } from "xlsx";

@Injectable()
export class TransferService {
    constructor(
        private _incomeService: ExportIncomeService,
        private _outcomeService: ExportOutcomeService,
        private _store$: Store,
    ) {}

    public download(form: NgForm, mode: Mode): void {
        const value = form.value;
        const from = new Date(value.from);
        const to = new Date(value.to);

        const extension = value.extension as Extension;
        if (from <= to) {
            const filter = new ExportFilter(from, to, extension);
            if (mode === Mode.Income) {
                const incomeSelector = dataSelectors.income.items;
                this.process(filter, this._incomeService, incomeSelector);
            }
            if (mode === Mode.Outcome) {
                const outcomeSelector = dataSelectors.outcome.items;
                this.process(filter, this._outcomeService, outcomeSelector);
            }
        }
    }

    public upload(form: NgForm): void {
        const path = form.value.path as string;
        console.log(path);
    }

    private process<T>(
        filter: IExportFilter,
        service: IExportService<T>,
        selector: MemoizedSelector<
            object,
            Dictionary<T>,
            DefaultProjectorFn<Dictionary<T>>
        >,
    ): void {
        this._store$
            .select(selector)
            .pipe(
                take(1),
                map(items => service.getItems(filter, items)),
                tap(items => {
                    const ws = service.getWorkSheet(filter, items);
                    const wb = utils.book_new();

                    utils.book_append_sheet(wb, ws, "Data");
                    writeFile(wb, `workbook.${filter.extension}`);
                }),
            )
            .subscribe();
    }
}
