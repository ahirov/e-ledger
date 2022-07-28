import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { GlobalError } from "../../../shared/error/error.model";
import { ModeService } from "../../workspace-mode.service";
import { ImportService } from "./import.service";

@Component({
    selector: "el-import",
    templateUrl: "./import.component.html",
    styleUrls: ["./import.component.scss"],
})
export class ImportComponent implements OnInit {
    private _file: File | null = null;
    public formSubmitted!: boolean;

    constructor(
        private _importService: ImportService,
        private _modeService: ModeService,
    ) {}

    public ngOnInit(): void {
        this.formSubmitted = false;
    }

    public onSubmit(form: NgForm): void {
        this.formSubmitted = true;
        form.control.markAllAsTouched();
        form.controls.file.markAsDirty();
        if (form.valid && this._file) {
            const isRewritten = !!form.value.isRewritten;
            this._importService.upload(this._file, isRewritten);
            form.reset();
            this.formSubmitted = false;
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

    public isIncome(): boolean {
        return this._modeService.isIncome();
    }

    public isOutcome(): boolean {
        return this._modeService.isOutcome();
    }
}
