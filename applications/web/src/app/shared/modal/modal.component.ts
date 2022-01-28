import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    selector: "el-modal",
    templateUrl: "./modal.component.html",
})
export class ModalComponent {
    public title?: string;
    public content?: string;

    constructor(public modalRef: BsModalRef) {}
}
