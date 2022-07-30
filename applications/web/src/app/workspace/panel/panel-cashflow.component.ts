import { Component } from "@angular/core";
import { CashflowMode } from "../model/mode.model";
import { ModeService } from "../workspace-mode.service";

@Component({
    template: `<div
        class="d-flex flex-lg-column align-items-center justify-content-evenly h-100">
        <button
            type="button"
            class="btn btn-outline-primary w-50 mx-4 my-3 my-lg-0 fw-bold"
            [class.active]="isIncome()"
            (click)="onSetIncome()">
            Income
        </button>
        <button
            type="button"
            class="btn btn-outline-primary w-50 mx-4 my-3 my-lg-0 fw-bold"
            [class.active]="isOutcome()"
            (click)="onSetOutcome()">
            Outcome
        </button>
    </div>`,
})
export class PanelCashflowComponent {
    constructor(private _modeService: ModeService) {}

    public isIncome(): boolean {
        return this._modeService.isIncome();
    }

    public isOutcome(): boolean {
        return this._modeService.isOutcome();
    }

    public onSetIncome(): void {
        this._modeService.setCashflowMode(CashflowMode.Income);
    }

    public onSetOutcome(): void {
        this._modeService.setCashflowMode(CashflowMode.Outcome);
    }
}
