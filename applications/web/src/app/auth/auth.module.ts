import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AuthComponent } from "./auth.component";
import { AuthLoginService } from "./auth-login.service";
import { AuthErrorService } from "./auth-error.service";
import { AuthTimerService } from "./auth-timer.service";
import { AuthResponseService } from "./auth-response.service";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: "auth", component: AuthComponent }]),
    ],
    providers: [
        AuthResponseService,
        AuthErrorService,
        AuthTimerService,
        AuthLoginService,
    ],
})
export class AuthModule {}
