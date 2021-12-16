import { Injectable, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";

import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { BsModalService, ModalOptions } from "ngx-bootstrap/modal";

import { Income } from "../model/income.model";
import { Outcome } from "../model/outcome.model";
import { ModalComponent } from "../../shared/modal/modal.component";
import * as fromOutcomeActions from "../store/outcome.actions";
import * as fromIncomeActions from "../store/income.actions";
import * as fromApp from "../../store/app.state";

@Injectable()
export class CashflowService implements OnDestroy {
    private _modalSub: Subscription | null = null;

    constructor(
        private _modalService: BsModalService,
        private _store$: Store<fromApp.AppState>,
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
        const modalRef = this._modalService.show(ModalComponent, initialState);
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

    public addIncome(form: NgForm): void {
        const value = form.value;
        const startedAt = new Date(value.startedAt);
        const endedAt = new Date(value.endedAt);
        const source = parseInt(value.source);
        const sum = parseFloat(value.sum);

        if (startedAt && endedAt && source && sum && startedAt <= endedAt) {
            this._store$.dispatch(
                fromIncomeActions.addIncome({
                    payload: new Income(startedAt, endedAt, source, sum),
                }),
            );
            form.reset();
        }
    }

    public addOutcome(form: NgForm): void {
        const value = form.value;
        const processedAt = new Date(value.processedAt);
        const category = parseInt(value.category);
        const sum = parseFloat(value.sum);
        const description = <string>value.description;

        if (processedAt && category && sum) {
            this._store$.dispatch(
                fromOutcomeActions.addOutcome({
                    payload: new Outcome(
                        processedAt,
                        category,
                        sum,
                        description,
                    ),
                }),
            );
            form.reset();
        }
    }

    private clearModal(): void {
        if (this._modalSub) {
            this._modalSub.unsubscribe();
            this._modalSub = null;
        }
    }
}
