import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { Subscription } from "rxjs";
import { Extension } from "./model/extension.model";
import { ExportFilter } from "./model/export.model";
import { GlobalError } from "../../shared/error/error.model";

import { ExportService } from "./export/export.service";
import { ImportService } from "./import/import.service";
import { Mode, RoutingService } from "../workspace-routing.service";

@Component({
    templateUrl: "./transfer.component.html",
    styleUrls: ["./transfer.component.scss"],
})
export class TransferComponent implements OnInit, OnDestroy {
    private _paramsSub!: Subscription;
    private _file: File | null = null;

    public MODE = Mode;
    public extensions!: Extension[];

    constructor(
        private _route: ActivatedRoute,
        private _exportService: ExportService,
        private _importService: ImportService,

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
            const value = form.value;
            const extension = value.extension as Extension;
            this._exportService.download(
                new ExportFilter(
                    new Date(value.from).toDate(),
                    new Date(value.to).toDate(),
                    extension,
                ),
                this.modeService.savedMode,
            );
            form.reset();
        }
    }

    public onImportSubmit(form: NgForm): void {
        if (form.valid && this._file) {
            const isRewritten = !!form.value.isRewritten;
            this._importService.upload(
                this._file,
                isRewritten,
                this.modeService.savedMode,
            );
            form.reset();
        }
    }

    public onFileChange(event: Event): void {
        this._file = null;
        const input = event.target as HTMLInputElement;
        if (input.files) {
            if (input.files.length === 1) {
                this._file = input.files[0];
            } else if (input.files.length > 1) {
                throw new GlobalError("Multiple files cannot be used!");
            }
        }
    }
}
