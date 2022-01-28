import { Injectable, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";

import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { BsModalService, ModalOptions } from "ngx-bootstrap/modal";

import { ModalConfirmComponent } from "../../../shared/modal/modal-confirm.component";

@Injectable()
export class ListService implements OnDestroy {
    private _modalSub: Subscription | null = null;

    constructor(
        private _modalService: BsModalService,
        private _store$: Store,
    ) {}

    public ngOnDestroy(): void {
        this.clearModal();
    }

    public openModal(
        id: string,
        title: string,
        sum: number,
        action: (props: { payload: string }) => {
            payload: string;
        } & TypedAction<any>,
    ): void {
        const initialState: ModalOptions = {
            initialState: {
                title: "Do you want to delete this item?:",
                content: `${title} - ${sum.toFixed(2)}`,
            },
            animated: true,
        };
        const modalRef = this._modalService.show(ModalConfirmComponent, initialState);
        if (modalRef.content) {
            this.clearModal();
            this._modalSub = modalRef.content.confirmation$
                .pipe(take(1))
                .subscribe(() => {
                    this._store$.dispatch(action({ payload: id }));
                    modalRef.hide();
                });
        }
    }

    private clearModal(): void {
        if (this._modalSub) {
            this._modalSub.unsubscribe();
            this._modalSub = null;
        }
    }
}
