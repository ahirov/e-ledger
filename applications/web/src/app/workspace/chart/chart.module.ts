import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { NgSelectModule } from "@ng-select/ng-select";
import { NgChartsModule } from "ng2-charts";

import { ChartService } from "./chart.service";
import { ChartComponent } from "./chart.component";
import { ChartLineComponent } from "./type/chart-line.component";
import { ChartBarComponent } from "./type/chart-bar.component";
import { ChartPieComponent } from "./type/chart-pie.component";

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
