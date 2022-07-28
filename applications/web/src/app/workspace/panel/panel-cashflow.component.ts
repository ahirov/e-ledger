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
            (click)="setIncome()">
            Income
        </button>
        <button
            type="button"
            class="btn btn-outline-primary w-50 mx-4 my-3 my-lg-0 fw-bold"
            [class.active]="isOutcome()"
            (click)="setOutcome()">
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

    public setIncome(): void {
        this._modeService.setCashflowMode(CashflowMode.Income);
    }

    public setOutcome(): void {
        this._modeService.setCashflowMode(CashflowMode.Outcome);
    }
}
