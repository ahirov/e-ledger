import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { ControlErrorService } from "../../../shared/control/control-error.service";
import { SettingService } from "./setting.service";
import { DialogMode, SyncMode } from "../model/state.model";
import { CredentialsView, ICredentialsView } from "../model/credentials.model";

import { environment } from "applications/web/src/environments/environment";
import { selectors as dataSelectors } from "../../../auth/store/auth.selectors";
import { selectors } from "../store/adjustment.selectors";
import * as fromActions from "../store/adjustment.actions";

@Component({
    selector: "el-setting",
    templateUrl: "./setting.component.html",
    styleUrls: ["./setting.component.scss"],
})
export class SettingsComponent implements OnInit, OnDestroy {
    private _userSub!: Subscription;
    private _errorSub!: Subscription;
    private _modeSub!: Subscription;

    public formSubmitted!: boolean;
    public credentials!: ICredentialsView;
    public syncModes!: { id: number; name: string }[];
    public passwordMinLength = environment.passwordMinLength;

    constructor(
        private _settingService: SettingService,
        private _errorService: ControlErrorService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this.formSubmitted = false;
        this.credentials = new CredentialsView();
        this.syncModes = [
            { id: SyncMode.Never, name: "never" },
            { id: SyncMode.OneMinute, name: "1 minute" },
            { id: SyncMode.FiveMinutes, name: "5 minutes" },
        ];
        this._userSub = this._store$
            .select(dataSelectors.user)
            .subscribe(user => {
                this.credentials.email = user?.email || "";
            });
        this._modeSub = this._store$.select(selectors.mode).subscribe(value => {
            switch (value) {
                case DialogMode.Saved:
                    this._settingService.showSavedDialog();
                    break;
                case DialogMode.ReAuth:
                    this._settingService.showReAuthDialog(
                        this.credentials.get(),
                    );
                    break;
            }
        });
        this._errorSub = this._store$
            .select(selectors.error)
            .subscribe(message => {
                if (message) {
                    this._settingService.showErrorDialog(message);
                }
            });
    }

    public ngOnDestroy(): void {
        if (this._userSub) {
            this._userSub.unsubscribe();
        }
        if (this._modeSub) {
            this._modeSub.unsubscribe();
        }
        if (this._errorSub) {
            this._errorSub.unsubscribe();
        }
    }

    public onSubmit(form: NgForm): void {
        this.formSubmitted = true;
        form.control.markAllAsTouched();
        if (form.valid) {
            this._store$.dispatch(
                fromActions.saveSettings({
                    payload: this.credentials.get(),
                }),
            );
            this.formSubmitted = false;
        }
    }

    public onCancel(): void {
        this.ngOnInit();
    }

    public getErrorMessage(item: NgModel): string {
        return this._errorService
            .getErrorMessages(item.name, item.control)
            .join(" ");
    }
}
