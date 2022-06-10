import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { BsModalRef } from "ngx-bootstrap/modal";

import { AuthRequest } from "../../../../auth/model/request.model";
import { ICredentials } from "../../model/credentials.model";
import * as fromActions from "../../store/adjustment.actions";

@Component({
    selector: "el-setting-dialog",
    templateUrl: "./setting.dialog.html",
    styleUrls: ["./setting.dialog.scss"],
})
export class SettingDialog {
    public credentials?: ICredentials;

    constructor(public modalRef: BsModalRef, private _store$: Store) {}

    public onSubmit(form: NgForm): void {
        if (form.valid && this.credentials) {
            const email    = form.value.email;
            const password = form.value.password;

            this._store$.dispatch(
                fromActions.loginSettings({
                    payload: {
                        request: new AuthRequest(email, password),
                        credentials: this.credentials.copy(),
                    },
                }),
            );
            form.reset();
            this.modalRef.hide();
        }
    }
}
