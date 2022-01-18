import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { Subscription } from "rxjs";
import { Extension } from "./model/extension.mode";
import { TransferService } from "./transfer.service";
import { Mode, RoutingService } from "../workspace-routing.service";

@Component({
    templateUrl: "./transfer.component.html",
    styleUrls: ["./transfer.component.scss"],
})
export class TransferComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;

    public MODE = Mode;
    public extensions!: Extension[];

    constructor(
        private _route: ActivatedRoute,
        private _transferService: TransferService,
        public modeService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this._paramsSub = this._route.params.subscribe(params =>
            this.modeService.saveMode(params),
        );
        this.extensions = [Extension.Xlsx, Extension.Csv];
    }

    public ngOnDestroy(): void {
        if (this._paramsSub) {
            this._paramsSub.unsubscribe();
        }
    }

    public onExportSubmit(form: NgForm): void {
        if (form.valid) {
            this._transferService.download(form, this.modeService.savedMode);
        }
    }

    public onImportSubmit(form: NgForm): void {
        if (form.valid) {
            this._transferService.upload(form);
        }
    }
}
