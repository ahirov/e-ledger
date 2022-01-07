import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { NgSelectModule } from "@ng-select/ng-select";
import { NgChartsModule } from "ng2-charts";

import { ChartService } from "./chart.service";
import { ChartComponent } from "./chart.component";
import { ChartLineComponent } from "./types/chart-line.component";
import { ChartBarComponent } from "./types/chart-bar.component";
import { ChartPieComponent } from "./types/chart-pie.component";

@NgModule({
    declarations: [
        ChartComponent,
        ChartLineComponent,
        ChartBarComponent,
        ChartPieComponent,
    ],
    imports: [CommonModule, FormsModule, NgChartsModule, NgSelectModule],
    exports: [ChartComponent],
    providers: [ChartService],
})
export class ChartModule {}
