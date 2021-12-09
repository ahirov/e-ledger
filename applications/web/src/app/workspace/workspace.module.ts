import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { WorkspaceComponent } from "./workspace.component";
import { CashflowComponent } from "./cashflow/cashflow.component";
import { CashflowPanelComponent } from "./cashflow/cashflow-panel.component";
import { SummaryComponent } from "./summary/summary.component";
import { SummaryPanelComponent } from "./summary/summary-panel.component";
import { ChartComponent } from "./chart/chart.component";
import { ChartPanelComponent } from "./chart/chart-panel.component";
import { TransferComponent } from "./transfer/transfer.component";
import { TransferPanelComponent } from "./transfer/transfer-panel.component";
import { AdjustmentComponent } from "./adjustment/adjustment.component";
import { AdjustmentPanelComponent } from "./adjustment/adjustment-panel.component";
import { ExitComponent } from "./exit/exit.component";
import { ExitPanelComponent } from "./exit/exit-panel.component";

import { RoutingService } from "./workspace-routing.service";
import { WorkspaceRoutingModule } from "./workspace-routing.module";

@NgModule({
    declarations: [
        WorkspaceComponent,
        CashflowComponent,
        CashflowPanelComponent,
        SummaryComponent,
        SummaryPanelComponent,
        ChartComponent,
        ChartPanelComponent,
        TransferComponent,
        TransferPanelComponent,
        AdjustmentComponent,
        AdjustmentPanelComponent,
        ExitComponent,
        ExitPanelComponent,
    ],
    imports: [
        CommonModule,
        WorkspaceRoutingModule,

        BsDatepickerModule.forRoot(),
    ],
    providers: [RoutingService],
})
export class WorkspaceModule {}
