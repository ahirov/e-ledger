import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { RoutingService } from "../workspace-routing.service";

@Component({
    templateUrl: "./transfer.component.html",
    styleUrls: ["./transfer.component.scss"],
})
export class TransferComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;

    constructor(
        private _route: ActivatedRoute,
        public modeService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this._paramsSub = this._route.params.subscribe(params =>
            this.modeService.saveMode(params),
        );
    }

    public ngOnDestroy(): void {
        if (this._paramsSub) {
            this._paramsSub.unsubscribe();
        }
    }
}
