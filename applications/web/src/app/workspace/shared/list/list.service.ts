import { Injectable, OnDestroy } from "@angular/core";
import { TypedAction } from "@ngrx/store/src/models";
import { Store } from "@ngrx/store";

import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { ListDialog } from "./dialog/list.dialog";

@Injectable()
export class ListService implements OnDestroy {
    private _dialog: Subscription | null = null;

    constructor(
        private _modalService: BsModalService,
        private _store$: Store,
    ) {}

    public ngOnDestroy(): void {
        this.clearDialog();
    }

    public openDialog(
        id: string,
        sum: number,
        name: string,
        action: (props: { payload: string }) => {
            payload: string;
        } & TypedAction<any>,
    ): void {
        const initialState: ModalOptions = {
            initialState: {
                message: `${name} - ${sum.toFixed(2)}`,
            },
            animated: true,
        };
        const dialogRef = this._modalService.show(ListDialog, initialState);
        if (dialogRef.content) {
            this.clearDialog();
            this._dialog = dialogRef.content.confirmation$
                .pipe(take(1))
                .subscribe(() => {
                    this._store$.dispatch(action({ payload: id }));
                    dialogRef.hide();
                });
        }
    }

    private clearDialog(): void {
        if (this._dialog) {
            this._dialog.unsubscribe();
            this._dialog = null;
        }
    }
}
