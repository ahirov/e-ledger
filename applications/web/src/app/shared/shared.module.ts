import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";

import { EnumToPairsPipe } from "../shared/pipes/enum.pipe";
import { TruncatePipe } from "../shared/pipes/string.pipe";
import { ModalComponent } from "./modal/modal.component";
import { ModalConfirmComponent } from "./modal/modal-confirm.component";

@NgModule({
    declarations: [EnumToPairsPipe, TruncatePipe],
    imports: [CommonModule, ModalModule.forRoot()],
    exports: [CommonModule, ModalModule, EnumToPairsPipe, TruncatePipe],
    entryComponents: [ModalComponent, ModalConfirmComponent],
})
export class SharedModule {}
