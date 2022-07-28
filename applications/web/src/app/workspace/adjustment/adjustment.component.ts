import { Component } from "@angular/core";
import { ModeService } from "../workspace-mode.service";

@Component({
    templateUrl: "./adjustment.component.html",
    styleUrls: ["./adjustment.component.scss"],
})
export class AdjustmentComponent {
    constructor(private _modeService: ModeService) {}

    public isSetting(): boolean {
        return this._modeService.isSetting();
    }

    public isEnumeration(): boolean {
        return this._modeService.isEnumeration();
    }
}
