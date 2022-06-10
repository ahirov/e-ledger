import { NgModule } from "@angular/core";

import { SharedModule } from "../../../shared/shared.module";
import { ListComponent } from "./list.component";
import { ListService } from "./list.service";
import { ListDialog } from "./dialog/list.dialog";

@NgModule({
    declarations: [ListComponent],
    imports: [SharedModule],
    exports: [ListComponent],
    providers: [ListService],
    entryComponents: [ListDialog],
})
export class WorkspaceListModule {}
