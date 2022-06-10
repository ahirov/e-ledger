import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { SettingService } from "./setting.service";
import { DialogMode, SyncMode } from "../model/state.model";
import { Credentials, ICredentials } from "../model/credentials.model";
import { selectors as dataSelectors } from "../../../auth/store/auth.selectors";
import { selectors } from "../store/adjustment.selectors";
import * as fromActions from "../store/adjustment.actions";

@Component({
    selector: "el-setting",
    templateUrl: "./setting.component.html",
    styleUrls: ["./setting.component.scss"],
})
export class SettingsComponent implements OnInit, OnDestroy {
    private _mockPassword = "xxxxxxxx";
    private _isMockPassword!: boolean;
    private _userSub!: Subscription;
    private _errorSub!: Subscription;
    private _modeSub!: Subscription;

    public syncModes!: { id: number; name: string }[];
    public email!: string;
    public password!: string;
    public passwordConfirm!: string;

    constructor(
        private _settingService: SettingService,
        private _store$: Store,
    ) {}

    public ngOnInit(): void {
        this.syncModes = [
            { id: SyncMode.Never, name: "never" },
            { id: SyncMode.OneMinute, name: "1 minute" },
            { id: SyncMode.FiveMinutes, name: "5 minutes" },
        ];
        this._isMockPassword = true;
        this.passwordConfirm = this._mockPassword;
        this.password = this._mockPassword;
        this._userSub = this._store$
            .select(dataSelectors.user)
            .subscribe(user => {
                this.email = user?.email || "";
            });
        this._modeSub = this._store$.select(selectors.mode).subscribe(value => {
            switch (value) {
                case DialogMode.Saved:
                    this._settingService.showSavedDialog();
                    break;
                case DialogMode.ReAuth:
                    this._settingService.showReAuthDialog(
                        this.getCredentials(),
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

    public onPasswordFocus(): void {
        if (this._isMockPassword) {
            this.password = "";
            this.passwordConfirm = "";
            this._isMockPassword = false;
        }
    }

    public onSubmit(form: NgForm): void {
        if (form.valid) {
            this._store$.dispatch(
                fromActions.saveSettings({
                    payload: this.getCredentials(),
                }),
            );
        }
    }

    public onCancel(): void {
        this.ngOnInit();
    }

    private getCredentials(): ICredentials {
        return new Credentials(
            this.email,
            !this._isMockPassword ? this.password : null,
        );
    }
}
