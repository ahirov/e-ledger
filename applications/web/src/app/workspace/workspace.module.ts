import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { NgSelectModule } from "@ng-select/ng-select";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ModalModule } from "ngx-bootstrap/modal";

import { TruncatePipe } from "../shared/pipes/string.pipe";
import { EnumToPairsPipe } from "../shared/pipes/enum.pipe";
import { WorkspaceComponent } from "./workspace.component";
import { CashflowComponent } from "./cashflow/cashflow.component";
import { CashflowPanelComponent } from "./cashflow/cashflow-panel.component";
import { SummaryComponent } from "./summary/summary.component";
import { SummaryPanelComponent } from "./summary/summary-panel.component";
import { ChartPanelComponent } from "./chart/chart-panel.component";
import { TransferComponent } from "./transfer/transfer.component";
import { TransferPanelComponent } from "./transfer/transfer-panel.component";
import { AdjustmentComponent } from "./adjustment/adjustment.component";
import { AdjustmentPanelComponent } from "./adjustment/adjustment-panel.component";
import { ExitComponent } from "./exit/exit.component";
import { ExitPanelComponent } from "./exit/exit-panel.component";
import { ListComponent } from "./list/list.component";
import { ListPaginationComponent } from "./list/list-pagination.component";
import { PaginationComponent } from "./list/pagination/pagination.component";

import { ListService } from "./list/list.service";
import { RoutingService } from "./workspace-routing.service";
import { CashflowService } from "./cashflow/cashflow.service";
import { SummaryService } from "./summary/summary.service";
import { ModalComponent } from "../shared/modal/modal.component";
import { WorkspaceRoutingModule } from "./workspace-routing.module";
import { ChartModule } from "./chart/chart.module";

@NgModule({
    declarations: [
        WorkspaceComponent,
        CashflowComponent,
        CashflowPanelComponent,
        SummaryComponent,
        SummaryPanelComponent,
        ChartPanelComponent,
        TransferComponent,
        TransferPanelComponent,
        AdjustmentComponent,
        AdjustmentPanelComponent,
        ExitComponent,
        ExitPanelComponent,
        ListComponent,
        ListPaginationComponent,
        PaginationComponent,
        EnumToPairsPipe,
        TruncatePipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        NgSelectModule,
        WorkspaceRoutingModule,

        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
    ],
    providers: [
        RoutingService,
        CashflowService,
        SummaryService,
        ListService,
    ],
    entryComponents: [ModalComponent],
})
export class WorkspaceModule {}
