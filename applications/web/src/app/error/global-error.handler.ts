import { ErrorHandler, Inject, Injectable, Injector } from "@angular/core";
import { BsModalService, ModalOptions } from "ngx-bootstrap/modal";

import { CustomError } from "./error.model";
import { ErrorComponent } from "./error.component";
import { environment } from "../../environments/environment";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    private get _modalService(): BsModalService {
        return this._injector.get(BsModalService);
    }

    constructor(@Inject(Injector) private readonly _injector: Injector) {}

    public handleError(error: any): void {
        const initialState: ModalOptions = {
            initialState: { message: this.getMessage(error) },
            animated: true,
        };
        this._modalService.show(ErrorComponent, initialState);
    }

    private getMessage(error: any): string {
        if (error instanceof CustomError) {
            return error.customMessage;
        } else {
            if (environment.production) {
                return "Unknown error!";
            } else {
                return error instanceof Error
                    ? error.message
                    : error.toString();
            }
        }
    }
}
