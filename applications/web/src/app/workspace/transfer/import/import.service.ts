import { Injectable } from "@angular/core";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";
import { BsModalService } from "ngx-bootstrap/modal";
import { map, take } from "rxjs/operators";
import { read, utils } from "xlsx";

import { IImportService } from "../model/import.model";
import { ISource } from "../../adjustment/model/income.model";
import { ICategory } from "../../adjustment/model/outcome.model";
import { GlobalError } from "../../../error/error.model";
import { Mode } from "../../workspace-routing.service";
import { ImportIncomeService } from "./import-income.service";
import { ImportOutcomeService } from "./import-outcome.service";
import { MessageDialog } from "../../../shared/dialog/message.dialog";
import { selectors as enumSelectors } from "../../adjustment/store/adjustment.selectors";
import { selectors } from "../store/transfer.selectors";

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
            try {
                var wb = read(event.target?.result);
                const wsName = wb.SheetNames[0];
                const ws = wb.Sheets[wsName];
                const data = utils.sheet_to_json(ws);
                if (mode === Mode.Income) {
                    this.processData(
                        data,
                        this._incomeService,
                        isRewritten ? selectors.income : enumSelectors.sources,
                    );
                }
                if (mode === Mode.Outcome) {
                    this.processData(
                        data,
                        this._outcomeService,
                        isRewritten
                            ? selectors.outcome
                            : enumSelectors.categories,
                    );
                }
            } catch {
                throw new GlobalError("Invalid input file!");
            }
        };
        reader.readAsArrayBuffer(file);
    }

    private processData<T>(
        data: any[],
        service: IImportService<T>,
        selector: MemoizedSelector<
            object,
            | { items: T[]; list: ISource[] | ICategory[] }
            | ISource[]
            | ICategory[],
            DefaultProjectorFn<
                | {
                      items: T[];
                      list: ISource[] | ICategory[];
                  }
                | ISource[]
                | ICategory[]
            >
        >,
    ) {
        this._store$
            .select(selector)
            .pipe(
                take(1),
                map(info => {
                    try {
                        this.showDialog(
                            "items" in info
                                ? service.processItems(
                                      data,
                                      info.list,
                                      info.items,
                                  )
                                : service.processItems(data, info),
                        );
                    } catch {
                        throw new GlobalError("Invalid input file!");
                    }
                }),
            )
            .subscribe();
    }

    private showDialog(result: { total: number; deleted: number }): void {
        const replaced =
            result.deleted > 0 ? ` (${result.deleted} items replaced)` : "";
        this._modalService.show(MessageDialog, {
            initialState: {
                title: "Import completed:",
                message: `${result.total} items were added${replaced}.`,
            },
            animated: true,
        });
    }
}
