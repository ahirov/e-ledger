import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";

@Component({
    templateUrl: "./modal.component.html",
})
export class ModalComponent implements OnInit {
    public confirmation$!: Subject<void>;
    public title?: string;
    public content?: string;

    constructor(public modalRef: BsModalRef) {}

    ngOnInit(): void {
        this.confirmation$ = new Subject();
    }

    public confirm(): void {
        this.confirmation$.next();
    }
}
