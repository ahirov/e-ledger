import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgSelectModule } from "@ng-select/ng-select";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { SharedModule } from "../../shared/shared.module";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";

import { CashflowService } from "./cashflow.service";
import { CashflowComponent } from "./cashflow.component";

@NgModule({
    declarations: [CashflowComponent],
    imports: [
        SharedModule,
        FormsModule,
        NgSelectModule,
        WorkspaceSharedModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
    ],
    exports: [CashflowComponent],
    providers: [CashflowService],
})
export class CashflowModule {}
