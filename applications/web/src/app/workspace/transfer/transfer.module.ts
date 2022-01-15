import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { NgSelectModule } from "@ng-select/ng-select";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TransferComponent } from "./transfer.component";

@NgModule({
    declarations: [TransferComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
    ],
    exports: [TransferComponent],
})
export class TransferModule {}
