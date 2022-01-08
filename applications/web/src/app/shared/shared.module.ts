import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TruncatePipe } from "../shared/pipes/string.pipe";
import { EnumToPairsPipe } from "../shared/pipes/enum.pipe";
import { ModalComponent } from "../shared/modal/modal.component";

@NgModule({
    declarations: [EnumToPairsPipe, TruncatePipe],
    imports: [CommonModule],
    exports: [CommonModule, EnumToPairsPipe, TruncatePipe],
    entryComponents: [ModalComponent],
})
export class SharedModule {}
