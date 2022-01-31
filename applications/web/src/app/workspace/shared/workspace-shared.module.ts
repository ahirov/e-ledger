import { NgModule } from "@angular/core";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

@NgModule({
    imports: [BsDatepickerModule.forRoot()],
    exports: [BsDatepickerModule],
})
export class WorkspaceSharedModule {}
