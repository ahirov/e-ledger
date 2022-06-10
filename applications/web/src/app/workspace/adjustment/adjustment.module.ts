import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { SortableModule } from "../../../../../ngx-bootstrap/src/sortable/sortable.module";

import { SettingDialog } from "./setting/dialog/setting.dialog";
import { SettingService } from "./setting/setting.service";
import { AdjustmentService } from "./adjustment.service";
import { AdjustmentResponseService } from "./adjustment-response.service";
import { PasswordDirective } from "./setting/password.directive";
import { AdjustmentComponent } from "./adjustment.component";
import { SettingsComponent } from "./setting/setting.component";
import { EnumerationsComponent } from "./enumeration/enumeration.component";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";
import { SharedModule } from "../../shared/shared.module";

import { Feature } from "../../shared/store/app.model";
import { adjustmentReducer } from "./store/adjustment.reducer";
import { AdjustmentEffects } from "./store/adjustment.effects";

@NgModule({
    declarations: [
        PasswordDirective,
        AdjustmentComponent,
        EnumerationsComponent,
        SettingsComponent,
        SettingDialog,
    ],
    imports: [
        SharedModule,
        WorkspaceSharedModule,
        SortableModule.forRoot(),
        StoreModule.forFeature(Feature.Adjustment, adjustmentReducer),
        EffectsModule.forFeature([AdjustmentEffects]),
    ],
    exports: [AdjustmentComponent],
    providers: [AdjustmentService, AdjustmentResponseService, SettingService],
})
export class AdjustmentModule {}
