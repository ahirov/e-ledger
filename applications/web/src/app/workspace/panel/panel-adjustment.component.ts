import { Component } from "@angular/core";
import { AdjustmentMode } from "../model/mode.model";
import { ModeService } from "../workspace-mode.service";

@Component({
    template: `<div
        class="d-flex flex-lg-column align-items-center justify-content-evenly h-100">
        <button
            type="button"
            class="btn btn-outline-primary w-50 mx-4 my-3 my-lg-0 fw-bold"
            [class.active]="isSetting()"
            (click)="onSetSetting()">
            Settings
        </button>
        <button
            type="button"
            class="btn btn-outline-primary w-50 mx-4 my-3 my-lg-0 fw-bold"
            [class.active]="isEnumeration()"
            (click)="onSetEnumeration()">
            Enumerations
        </button>
    </div>`,
})
export class PanelAdjustmentComponent {
    constructor(private _modeService: ModeService) {}

    public isSetting(): boolean {
        return this._modeService.isSetting();
    }

    public isEnumeration(): boolean {
        return this._modeService.isEnumeration();
    }

    public onSetSetting(): void {
        this._modeService.setAdjustmentMode(AdjustmentMode.Setting);
    }

    public onSetEnumeration(): void {
        this._modeService.setAdjustmentMode(AdjustmentMode.Enumeration);
    }
}
