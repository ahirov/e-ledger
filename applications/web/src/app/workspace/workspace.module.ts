import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { CashflowModule } from "./cashflow/cashflow.module";
import { SummaryModule } from "./summary/summary.module";
import { ChartModule } from "./chart/chart.module";
import { TransferModule } from "./transfer/transfer.module";
import { AdjustmentModule } from "./adjustment/adjustment.module";
import { ExitModule } from "./exit/exit.module";
import { WorkspaceRoutingModule } from "./workspace-routing.module";

import { Feature } from "../shared/store/app.model";
import { workspaceReducer } from "./data/store/state.reducer";
import { WorkspaceIncomeEffects } from "./data/store/income.effects";
import { WorkspaceOutcomeEffects } from "./data/store/outcome.effects";

import { ModeService } from "./workspace-mode.service";
import { IncomeService } from "./data/store/income.service";
import { OutcomeService } from "./data/store/outcome.service";
import { WorkspaceComponent } from "./workspace.component";
import { PanelCashflowComponent } from "./panel/panel-cashflow.component";
import { PanelAdjustmentComponent } from "./panel/panel-adjustment.component";
import { PanelExitComponent } from "./panel/panel-exit.component";

@NgModule({
    declarations: [
        WorkspaceComponent,
        PanelCashflowComponent,
        PanelAdjustmentComponent,
        PanelExitComponent,
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

        StoreModule.forFeature(Feature.Data, workspaceReducer),
        EffectsModule.forFeature([
            WorkspaceIncomeEffects,
            WorkspaceOutcomeEffects,
        ]),
    ],
    providers: [ModeService, IncomeService, OutcomeService],
})
export class WorkspaceModule {}
