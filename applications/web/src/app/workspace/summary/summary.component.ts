import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { Subscription } from "rxjs";
import { Source } from "../model/income.model";
import { Category } from "../model/outcome.model";
import { Mode, RoutingService } from "../workspace-routing.service";

@Component({
    templateUrl: "./summary.component.html",
    styleUrls: ["./summary.component.scss"],
})
export class SummaryComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;

    public mode = Mode;
    public source = Source;
    public category = Category;

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

    public onSubmit(_form: NgForm): void {}
}
