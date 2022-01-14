import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    templateUrl: "./error.component.html",
})
export class ErrorComponent {
    public message?: string;

    constructor(public modalRef: BsModalRef) {}
}
