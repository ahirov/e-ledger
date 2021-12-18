import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { Subscription } from "rxjs";

import { Mode, RoutingService } from "../workspace-routing.service";
import { CashflowService } from "./cashflow.service";
import { Source } from "../model/income.model";
import { Category } from "../model/outcome.model";

@Component({
    templateUrl: "./cashflow.component.html",
    styleUrls: ["./cashflow.component.scss"],
})
export class CashflowComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;

    public mode = Mode;
    public source = Source;
    public category = Category;

    constructor(
        private _route: ActivatedRoute,
        private _cashflowService: CashflowService,
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

    public onSubmit(form: NgForm): void {
        if (form.valid) {
            if (this.modeService.savedMode === Mode.Income) {
                this._cashflowService.addIncome(form);
            }
            if (this.modeService.savedMode === Mode.Outcome) {
                this._cashflowService.addOutcome(form);
            }
        }
    }
}
