import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../../shared/shared.module";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";
import { WorkspaceListModule } from "../shared/list/workspace-list.module";

import { Feature } from "../../shared/store/app.model";
import { summaryReducer } from "./store/state.reducer";
import { SummaryIncomeEffects } from "./store/income.effects";
import { SummaryOutcomeEffects } from "./store/outcome.effects";

import { StateService } from "./store/state.service";
import { SummaryService } from "./summary.service";
import { SummaryComponent } from "./summary.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { ContentComponent } from "./content/content.component";

@NgModule({
    declarations: [
        SummaryComponent,
        ContentComponent,
        PaginationComponent,
    ],
    imports: [
        SharedModule,
        WorkspaceSharedModule,
        WorkspaceListModule,

        StoreModule.forFeature(Feature.Summary, summaryReducer),
        EffectsModule.forFeature([SummaryIncomeEffects, SummaryOutcomeEffects]),
    ],
    exports: [SummaryComponent],
    providers: [SummaryService, StateService],
})
export class SummaryModule {}
