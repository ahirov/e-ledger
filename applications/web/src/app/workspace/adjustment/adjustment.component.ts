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

    public MODE = Mode;
    public mode: Mode | null = null;

    constructor(
        private _route: ActivatedRoute,
        private _modeService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this._paramsSub = this._route.params.subscribe(params => {
            const mode = this._modeService.getMode(params);
            if (mode) {
                this.mode = mode;
            }
        });
    }

    public ngOnDestroy(): void {
        if (this._paramsSub) {
            this._paramsSub.unsubscribe();
        }
    }
}
