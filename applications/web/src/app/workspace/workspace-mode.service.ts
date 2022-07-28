import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AdjustmentMode, CashflowMode } from "./model/mode.model";

@Injectable()
export class ModeService {
    private _cashflowMode: CashflowMode;
    private _adjustmentMode: AdjustmentMode;

    public cashflowModes: Subject<CashflowMode>;

    constructor() {
        this._cashflowMode = CashflowMode.Income;
        this._adjustmentMode = AdjustmentMode.Setting;
        this.cashflowModes = new Subject<CashflowMode>();
    }

    public isIncome(): boolean {
        return this._cashflowMode === CashflowMode.Income;
    }

    public isOutcome(): boolean {
        return this._cashflowMode === CashflowMode.Outcome;
    }

    public isSetting(): boolean {
        return this._adjustmentMode === AdjustmentMode.Setting;
    }

    public isEnumeration(): boolean {
        return this._adjustmentMode === AdjustmentMode.Enumeration;
    }

    public setCashflowMode(mode: CashflowMode): void {
        this._cashflowMode = mode;
        this.cashflowModes.next(mode);
    }

    public setAdjustmentMode(mode: AdjustmentMode): void {
        this._adjustmentMode = mode;
    }
}
