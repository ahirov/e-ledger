import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { WorkspaceComponent } from "./workspace.component";
import { CashflowComponent } from "./cashflow/cashflow.component";
import { SummaryComponent } from "./summary/summary.component";
import { ChartComponent } from "./chart/chart.component";
import { TransferComponent } from "./transfer/transfer.component";
import { AdjustmentComponent } from "./adjustment/adjustment.component";
import { ExitComponent } from "./exit/exit.component";

import { PanelCashflowComponent } from "./panel/panel-cashflow.component";
import { PanelSummaryComponent } from "./panel/panel-summary.component";
import { PanelChartComponent } from "./panel/panel-chart.component";
import { PanelTransferComponent } from "./panel/panel-transfer.component";
import { PanelAdjustmentComponent } from "./panel/panel-adjustment.component";
import { PanelExitComponent } from "./panel/panel-exit.component";

const routes: Routes = [
    {
        path: "",
        component: WorkspaceComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "cashflow/:mode",
                children: [
                    {
                        path: "",
                        outlet: "primary",
                        component: CashflowComponent,
                    },
                    {
                        path: "",
                        outlet: "panel",
                        component: PanelCashflowComponent,
                    },
                ],
            },
            {
                path: "summary/:mode",
                children: [
                    {
                        path: "",
                        outlet: "primary",
                        component: SummaryComponent,
                    },
                    {
                        path: "",
                        outlet: "panel",
                        component: PanelSummaryComponent,
                    },
                ],
            },
            {
                path: "chart/:mode",
                children: [
                    {
                        path: "",
                        outlet: "primary",
                        component: ChartComponent,
                    },
                    {
                        path: "",
                        outlet: "panel",
                        component: PanelChartComponent,
                    },
                ],
            },
            {
                path: "transfer/:mode",
                children: [
                    {
                        path: "",
                        outlet: "primary",
                        component: TransferComponent,
                    },
                    {
                        path: "",
                        outlet: "panel",
                        component: PanelTransferComponent,
                    },
                ],
            },
            {
                path: "adjustment/:mode",
                children: [
                    {
                        path: "",
                        outlet: "primary",
                        component: AdjustmentComponent,
                    },
                    {
                        path: "",
                        outlet: "panel",
                        component: PanelAdjustmentComponent,
                    },
                ],
            },
            {
                path: "exit",
                children: [
                    {
                        path: "",
                        outlet: "primary",
                        component: ExitComponent,
                    },
                    {
                        path: "",
                        outlet: "panel",
                        component: PanelExitComponent,
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
