import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    selector: "el-error-modal",
    templateUrl: "./error.component.html",
})
export class ErrorComponent {
    public message?: string;

    constructor(public modalRef: BsModalRef) {}
}
