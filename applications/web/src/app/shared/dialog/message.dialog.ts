import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    selector: "el-message-dialog",
    templateUrl: "./message.dialog.html",
})
export class MessageDialog {
    public title?: string;
    public message?: string;

    constructor(public modalRef: BsModalRef) {}
}
