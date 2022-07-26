import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    selector: "el-error-dialog",
    templateUrl: "./error.dialog.html",
})
export class ErrorDialog {
    public message?: string;

    constructor(public modalRef: BsModalRef) {}
}
