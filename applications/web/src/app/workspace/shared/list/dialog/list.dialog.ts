import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";

@Component({
    selector: "el-list-dialog",
    templateUrl: "./list.dialog.html",
})
export class ListDialog implements OnInit {
    public confirmation$!: Subject<void>;
    public message?: string;

    constructor(public modalRef: BsModalRef) {}

    public ngOnInit(): void {
        this.confirmation$ = new Subject();
    }

    public onConfirm(): void {
        this.confirmation$.next();
    }
}
