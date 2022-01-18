import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { NgSelectModule } from "@ng-select/ng-select";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TransferComponent } from "./transfer.component";
import { TransferService } from "./transfer.service";
import { ExportIncomeService } from "./export/export-income.service";
import { ExportOutcomeService } from "./export/export-outcome.service";

@NgModule({
    declarations: [TransferComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        TooltipModule.forRoot(),
        BsDatepickerModule.forRoot(),
    ],
    exports: [TransferComponent],
    providers: [TransferService, ExportIncomeService, ExportOutcomeService],
})
export class TransferModule {}
