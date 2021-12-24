import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { AppRoutingModule } from "./app-routing.module";
import { appReducer, appEffects } from "./store/app.state";
import { environment } from "../environments/environment";
import { StateService } from "./workspace/store/state.service";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot(appEffects),
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),

        AuthModule,
        AppRoutingModule,
    ],
    providers: [StateService],
    bootstrap: [AppComponent],
})
export class AppModule {}
