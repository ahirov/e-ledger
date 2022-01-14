import { ErrorHandler, Inject, Injectable, Injector } from "@angular/core";
import { BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { ErrorComponent } from "./error.component";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    private get _modalService(): BsModalService {
        return this._injector.get(BsModalService);
    }

    constructor(@Inject(Injector) private readonly _injector: Injector) {}

    public handleError(error: any): void {
        const initialState: ModalOptions = {
            initialState: {
                message:
                    error instanceof Error ? error.message : error.toString(),
            },
            animated: true,
        };
        this._modalService.show(ErrorComponent, initialState);
    }
}
