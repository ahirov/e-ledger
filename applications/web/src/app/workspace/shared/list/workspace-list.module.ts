import { NgModule } from "@angular/core";

import { SharedModule } from "../../../shared/shared.module";
import { ListIncomeComponent } from "./list-income.component";
import { ListOutcomeComponent } from "./list-outcome.component";
import { ListService } from "./list.service";
import { ListDialog } from "./dialog/list.dialog";

@NgModule({
    declarations: [ListIncomeComponent, ListOutcomeComponent],
    imports: [SharedModule],
    exports: [ListIncomeComponent, ListOutcomeComponent],
    providers: [ListService],
    entryComponents: [ListDialog],
})
export class WorkspaceListModule {}
