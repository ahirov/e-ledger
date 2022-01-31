import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { TooltipModule } from "ngx-bootstrap/tooltip";

import { SharedModule } from "../../shared/shared.module";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";
import { TransferComponent } from "./transfer.component";

import { ExportService } from "./export/export.service";
import { ExportIncomeService } from "./export/export-income.service";
import { ExportOutcomeService } from "./export/export-outcome.service";
import { ImportService } from "./import/import.service";
import { ImportIncomeService } from "./import/import-income.service";
import { ImportOutcomeService } from "./import/import-outcome.service";

@NgModule({
    declarations: [TransferComponent],
    imports: [
        SharedModule,
        FormsModule,
        NgSelectModule,
        TooltipModule.forRoot(),
        WorkspaceSharedModule
    ],
    exports: [TransferComponent],
    providers: [
        ExportService,
        ExportIncomeService,
        ExportOutcomeService,
        ImportService,
        ImportIncomeService,
        ImportOutcomeService,
    ],
})
export class TransferModule {}
