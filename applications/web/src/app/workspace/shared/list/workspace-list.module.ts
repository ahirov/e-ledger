import { NgModule } from "@angular/core";

import { SharedModule } from "../../../shared/shared.module";
import { ListComponent } from "./list.component";
import { ListService } from "./list.service";

@NgModule({
    declarations: [ListComponent],
    imports: [SharedModule],
    exports: [ListComponent],
    providers: [ListService],
})
export class WorkspaceListModule {}
