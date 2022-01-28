import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { BsModalService } from "ngx-bootstrap/modal";
import { map, take, tap } from "rxjs/operators";

import { IExportFilter, IExportService } from "../model/export.model";
import { ModalComponent } from "../../../shared/modal/modal.component";
import { Mode } from "../../workspace-routing.service";
import { ExportIncomeService } from "../export/export-income.service";
import { ExportOutcomeService } from "../export/export-outcome.service";
import { selectors as dataSelectors } from "../../data/store/state.selectors";
import { writeFile, utils } from "xlsx";

@Injectable()
export class ExportService {
    constructor(
        private _incomeService: ExportIncomeService,
        private _outcomeService: ExportOutcomeService,
        private _modalService: BsModalService,
        private _store$: Store,
    ) {}

    public download(filter: IExportFilter, mode: Mode): void {
        if (filter.from <= filter.to) {
            if (mode === Mode.Income) {
                const incomeSelector = dataSelectors.income.items;
                this.process(filter, this._incomeService, incomeSelector);
            }
            if (mode === Mode.Outcome) {
                const outcomeSelector = dataSelectors.outcome.items;
                this.process(filter, this._outcomeService, outcomeSelector);
            }
        } else {
            throw new Error("Invalid input data!");
        }
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
                    this.printResult(items.length);
                }),
            )
            .subscribe();
    }

    private printResult(count: number): void {
        this._modalService.show(ModalComponent, {
            initialState: {
                title: "Export completed.",
                content: `${count} items were selected.`,
            },
            animated: true,
        });
    }
}
