import { Component } from "@angular/core";

@Component({
    template: `<div
        class="d-flex flex-lg-column align-items-center justify-content-evenly h-100">
        <button
            type="button"
            routerLink="../settings"
            routerLinkActive="active"
            class="btn btn-outline-primary w-50 mx-4 my-3 my-lg-0 fw-bold">
            Settings
        </button>
        <button
            type="button"
            routerLink="../enumerations"
            routerLinkActive="active"
            class="btn btn-outline-primary w-50 mx-4 my-3 my-lg-0 fw-bold">
            Enumerations
        </button>
    </div>`,
})
export class AdjustmentPanelComponent {}
