import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgSelectModule } from "@ng-select/ng-select";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { SharedModule } from "../../shared/shared.module";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";

import { SummaryService } from "./summary.service";
import { SummaryComponent } from "./summary.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { ListPaginationComponent } from "./pagination/list-pagination.component";

@NgModule({
    declarations: [
        SummaryComponent,
        ListPaginationComponent,
        PaginationComponent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        NgSelectModule,
        WorkspaceSharedModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
    ],
    exports: [SummaryComponent],
    providers: [SummaryService],
})
export class SummaryModule {}
