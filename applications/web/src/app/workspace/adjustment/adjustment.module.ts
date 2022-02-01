import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SortableModule } from "../../../../../ngx-bootstrap/src/sortable/sortable.module";
import { EnumerationsComponent } from "./enumerations/enumerations.component";
import { AdjustmentComponent } from "./adjustment.component";

@NgModule({
    declarations: [AdjustmentComponent, EnumerationsComponent],
    imports: [CommonModule, FormsModule, SortableModule.forRoot()],
    exports: [AdjustmentComponent],
})
export class AdjustmentModule {}
