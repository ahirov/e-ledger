import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import { BsModalService } from "ngx-bootstrap/modal";

import { SettingDialog } from "./dialog/setting.dialog";
import { ErrorDialog } from "../../../error/dialog/error.dialog";
import { AdjustmentService } from "../adjustment.service";
import { ICredentials } from "../model/credentials.model";
import { DialogMode } from "../model/state.model";
import * as fromActions from "../store/adjustment.actions";

@Injectable()
export class SettingService {
    constructor(
        private _adjustmentService: AdjustmentService,
        private _modalService: BsModalService,
        private _store$: Store,
    ) {}

    public showSavedDialog(): void {
        const modalRef = this._adjustmentService.showSavedDialog();
        if (modalRef?.onHide) {
            modalRef.onHide.pipe(take(1)).subscribe(() => {
                this.setNoneMode();
            });
        }
    }

    public showReAuthDialog(credentials: ICredentials): void {
        const modalRef = this._modalService.show(SettingDialog, {
            initialState: { credentials: credentials },
            animated: true,
        });
        if (modalRef?.onHide) {
            modalRef.onHide.pipe(take(1)).subscribe(() => {
                this.setNoneMode();
            });
        }
    }

    public showErrorDialog(message: string): void {
        const modalRef = this._modalService.show(ErrorDialog, {
            initialState: { message: message },
            animated: true,
        });
        if (modalRef?.onHide) {
            modalRef.onHide.pipe(take(1)).subscribe(() => {
                this._store$.dispatch(fromActions.setError({ payload: null }));
            });
        }
    }

    private setNoneMode() {
        this._store$.dispatch(
            fromActions.setMode({ payload: DialogMode.None }),
        );
    }
}
