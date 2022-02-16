import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgChartsModule } from "ng2-charts";

import { Feature } from "../../shared/store/app.model";
import { chartReducer } from "./store/state.reducer";
import { ChartIncomeEffects } from "./store/income.effects";
import { ChartOutcomeEffects } from "./store/outcome.effects";

import { ChartService } from "./chart.service";
import { StateService } from "./store/state.service";
import { IncomeService } from "./store/income.service";
import { OutcomeService } from "./store/outcome.service";
import { ChartComponent } from "./chart.component";
import { ChartLineComponent } from "./type/chart-line.component";
import { ChartBarComponent } from "./type/chart-bar.component";
import { ChartPieComponent } from "./type/chart-pie.component";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";

@NgModule({
    declarations: [
        ChartComponent,
        ChartLineComponent,
        ChartBarComponent,
        ChartPieComponent,
    ],
    imports: [
        CommonModule,
        NgChartsModule,
        WorkspaceSharedModule,
        StoreModule.forFeature(Feature.Chart, chartReducer),
        EffectsModule.forFeature([ChartIncomeEffects, ChartOutcomeEffects]),
    ],
    exports: [ChartComponent],
    providers: [ChartService, StateService, IncomeService, OutcomeService],
})
export class ChartModule {}
