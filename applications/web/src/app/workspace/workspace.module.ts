import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CashflowModule } from "./cashflow/cashflow.module";
import { SummaryModule } from "./summary/summary.module";
import { ChartModule } from "./chart/chart.module";
import { TransferModule } from "./transfer/transfer.module";
import { AdjustmentModule } from "./adjustment/adjustment.module";
import { ExitModule } from "./exit/exit.module";
import { WorkspaceRoutingModule } from "./workspace-routing.module";

import { RoutingService } from "./workspace-routing.service";
import { WorkspaceComponent } from "./workspace.component";
import { CashflowPanelComponent } from "./panel/cashflow-panel.component";
import { SummaryPanelComponent } from "./panel/summary-panel.component";
import { ChartPanelComponent } from "./panel/chart-panel.component";
import { TransferPanelComponent } from "./panel/transfer-panel.component";
import { AdjustmentPanelComponent } from "./panel/adjustment-panel.component";
import { ExitPanelComponent } from "./panel/exit-panel.component";

@NgModule({
    declarations: [
        WorkspaceComponent,
        CashflowPanelComponent,
        SummaryPanelComponent,
        ChartPanelComponent,
        TransferPanelComponent,
        AdjustmentPanelComponent,
        ExitPanelComponent,
    ],
    imports: [
        CommonModule,
        CashflowModule,
        SummaryModule,
        ChartModule,
        TransferModule,
        AdjustmentModule,
        ExitModule,
        WorkspaceRoutingModule,
    ],
    providers: [RoutingService],
})
export class WorkspaceModule {}
