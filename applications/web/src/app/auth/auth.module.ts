import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ControlSharedModule } from "../shared/control/control-shared.module";
import { AuthComponent } from "./auth.component";
import { AuthLoginService } from "./auth-login.service";
import { AuthErrorService } from "./auth-error.service";
import { AuthTimerService } from "./auth-timer.service";
import { AuthResponseService } from "./auth-response.service";
import { Feature } from "../shared/store/app.model";
import { AuthEffects } from "./store/auth.effects";
import { authReducer } from "./store/auth.reducer";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        FormsModule,
        ControlSharedModule,
        RouterModule.forChild([{ path: "auth", component: AuthComponent }]),
        StoreModule.forFeature(Feature.Auth, authReducer),
        EffectsModule.forFeature([AuthEffects]),
    ],
    providers: [
        AuthResponseService,
        AuthErrorService,
        AuthTimerService,
        AuthLoginService,
    ],
})
export class AuthModule {}
