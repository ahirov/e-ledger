import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Subscription } from "rxjs";
import { Mode, RoutingService } from "../workspace-routing.service";

@Component({
    templateUrl: "./adjustment.component.html",
    styleUrls: ["./adjustment.component.scss"],
})
export class AdjustmentComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;

    public currentMode: Mode | null = null;
    public mode = Mode;

    constructor(
        private _route: ActivatedRoute,
        private _modeService: RoutingService,
    ) {}

    ngOnInit(): void {
        this._paramsSub = this._route.params.subscribe(params => {
            const mode = this._modeService.getMode(params);
            if (mode) {
                this.currentMode = mode;
            }
        });
    }

    ngOnDestroy(): void {
        if (this._paramsSub) {
            this._paramsSub.unsubscribe();
        }
    }
}
