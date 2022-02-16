import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

@NgModule({
    imports: [FormsModule, NgSelectModule, BsDatepickerModule.forRoot()],
    exports: [FormsModule, NgSelectModule, BsDatepickerModule],
})
export class WorkspaceSharedModule {}
