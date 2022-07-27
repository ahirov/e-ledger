import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Extension } from "../model/extension.model";
import { ExportFilter } from "../model/export.model";
import { ExportService } from "./export.service";
import { RoutingService } from "../../workspace-routing.service";

@Component({
    selector: "el-export",
    templateUrl: "./export.component.html",
    styleUrls: ["./export.component.scss"],
})
export class ExportComponent implements OnInit {
    public formSubmitted!: boolean;
    public extensions!: Extension[];

    constructor(
        private _exportService: ExportService,
        public modeService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this.formSubmitted = false;
        this.extensions = [Extension.Xlsx, Extension.Csv];
    }

    public onSubmit(form: NgForm): void {
        this.formSubmitted = true;
        form.control.markAllAsTouched();
        form.controls.from.markAsDirty();
        form.controls.to.markAsDirty();
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
            this.formSubmitted = false;
        }
    }
}
