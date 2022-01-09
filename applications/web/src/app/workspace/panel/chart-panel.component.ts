import { Component } from "@angular/core";
import { Mode, RoutingService } from "../workspace-routing.service";

@Component({
    /* ChartJs canvas element interferes with the routerLinkActive attribute */
    template: `<div
        class="
        d-flex
        flex-lg-column
        align-items-center
        justify-content-evenly
        h-100
    ">
        <button
            routerLink="../income"
            [class.active]="modeService.savedMode === MODE.Income"
            class="btn btn-outline-primary w-50 mx-4 my-3 my-lg-0 fw-bold">
            Income
        </button>
        <button
            routerLink="../outcome"
            [class.active]="modeService.savedMode === MODE.Outcome"
            class="btn btn-outline-primary w-50 mx-4 my-3 my-lg-0 fw-bold">
            Outcome
        </button>
    </div>`,
})
export class ChartPanelComponent {
    public MODE = Mode;
    constructor(public modeService: RoutingService) {}
}
