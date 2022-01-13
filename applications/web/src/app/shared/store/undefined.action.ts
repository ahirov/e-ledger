import { Action } from "@ngrx/store";

export class UndefinedAction implements Action {
    readonly type = "[None] Undefined action";
}
