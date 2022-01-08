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

import { CashflowPanelComponent } from "./panel/cashflow-panel.component";
import { SummaryPanelComponent } from "./panel/summary-panel.component";
import { ChartPanelComponent } from "./panel/chart-panel.component";
import { TransferPanelComponent } from "./panel/transfer-panel.component";
import { AdjustmentPanelComponent } from "./panel/adjustment-panel.component";
import { ExitPanelComponent } from "./panel/exit-panel.component";

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
                        component: CashflowPanelComponent,
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
                        component: SummaryPanelComponent,
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
                        component: ChartPanelComponent,
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
                        component: TransferPanelComponent,
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
                        component: AdjustmentPanelComponent,
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
                        component: ExitPanelComponent,
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
