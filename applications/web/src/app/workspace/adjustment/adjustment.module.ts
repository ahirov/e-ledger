import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { SortableModule } from "../../../../../ngx-bootstrap/src/sortable/sortable.module";

import { Feature } from "../../shared/store/app.model";
import { adjustmentReducer } from "./store/adjustment.reducer";
import { AdjustmentComponent } from "./adjustment.component";
import { EnumerationsComponent } from "./enumeration/enumeration.component";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";

@NgModule({
    declarations: [AdjustmentComponent, EnumerationsComponent],
    imports: [
        CommonModule,
        WorkspaceSharedModule,
        SortableModule.forRoot(),
        StoreModule.forFeature(Feature.Adjustment, adjustmentReducer),
    ],
    exports: [AdjustmentComponent],
})
export class AdjustmentModule {}
