import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { WorkspaceComponent } from "./workspace.component";

@NgModule({
    declarations: [WorkspaceComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "workspace",
                component: WorkspaceComponent,
                canActivate: [AuthGuard],
            },
        ]),
    ],
})
export class WorkspaceModule {}
