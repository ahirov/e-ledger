import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";

import { TruncatePipe } from "../shared/pipes/string.pipe";
import { ModalComponent } from "./modal/modal.component";
import { ModalConfirmComponent } from "./modal/modal-confirm.component";

@NgModule({
    declarations: [TruncatePipe],
    imports: [CommonModule, ModalModule.forRoot()],
    exports: [CommonModule, ModalModule, TruncatePipe],
    entryComponents: [ModalComponent, ModalConfirmComponent],
})
export class SharedModule {}
