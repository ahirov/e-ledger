import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { BsModalService } from "ngx-bootstrap/modal";
import { map, take } from "rxjs/operators";
import { read, utils } from "xlsx";

import { ModalComponent } from "../../../shared/modal/modal.component";
import { IImportService } from "../model/import.model";
import { Mode } from "../../workspace-routing.service";
import { ImportIncomeService } from "./import-income.service";
import { ImportOutcomeService } from "./import-outcome.service";
import { selectors } from "../../data/store/state.selectors";

@Injectable()
export class ImportService {
    constructor(
        private _incomeService: ImportIncomeService,
        private _outcomeService: ImportOutcomeService,
        private _modalService: BsModalService,
        private _store$: Store,
    ) {}

    public upload(file: File, isRewritten: boolean, mode: Mode): void {
        var reader = new FileReader();
        reader.onload = event => {
            var wb = read(event.target?.result);
            const wsName = wb.SheetNames[0];
            const ws = wb.Sheets[wsName];
            const data = utils.sheet_to_json(ws);
            if (mode === Mode.Income) {
                this.processData(
                    data,
                    isRewritten,
                    this._incomeService,
                    selectors.income.items,
                );
            }
            if (mode === Mode.Outcome) {
                this.processData(
                    data,
                    isRewritten,
                    this._outcomeService,
                    selectors.outcome.items,
                );
            }
        };
        reader.readAsArrayBuffer(file);
    }

    private processData<T>(
        data: any[],
        isRewritten: boolean,
        service: IImportService<T>,
        selector: MemoizedSelector<
            object,
            Dictionary<T>,
            DefaultProjectorFn<Dictionary<T>>
        >,
    ) {
        if (isRewritten) {
            this._store$
                .select(selector)
                .pipe(
                    take(1),
                    map(items => {
                        try {
                            this.printResult(service.processItems(data, items));
                        } catch {
                            throw new Error("Invalid input file!");
                        }
                    }),
                )
                .subscribe();
        } else {
            try {
                this.printResult(service.processItems(data));
            } catch {
                throw new Error("Invalid input file!");
            }
        }
    }

    private printResult(result: { total: number; deleted: number }): void {
        const replaced = result.deleted > 0
            ? ` (${result.deleted} items replaced)`
            : "";
        this._modalService.show(ModalComponent, {
            initialState: {
                title: "Import completed.",
                content: `${result.total} items were added${replaced}.`,
            },
            animated: true,
        });
    }
}
