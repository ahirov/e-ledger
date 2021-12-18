import { Injectable } from "@angular/core";

export enum RoutingPath {
    Cashflow   = "cashflow",
    Summary    = "summary",
    Chart      = "chart",
    Transfer   = "transfer",
    Adjustment = "adjustment",
    Exit       = "exit",
}

export enum Mode {
    Income     = "income",
    Outcome    = "outcome",
    Categories = "categories",
    User       = "user",
}

@Injectable()
export class RoutingService {
    private _savedModePaths: { [path in RoutingPath]: boolean };
    private _savedMode: Mode;

    public get savedMode(): Mode {
        return this._savedMode;
    }

    constructor() {
        this._savedMode = Mode.Income;
        this._savedModePaths = {
            cashflow:   true,
            summary:    true,
            chart:      true,
            transfer:   true,
            adjustment: false,
            exit:       false,
        };
    }

    public hasSavedMode(path: RoutingPath): boolean {
        return path in this._savedModePaths
            ? this._savedModePaths[path]
            : false;
    }

    public saveMode(param: { [key: string]: string }): void {
        const mode = param["mode"];
        if (mode == Mode.Income) {
            this._savedMode = Mode.Income;
        }
        if (mode == Mode.Outcome) {
            this._savedMode = Mode.Outcome;
        }
    }

    public getMode(param: { [key: string]: string }): Mode | null {
        const mode = param["mode"];
        if (mode == Mode.Categories) {
            return Mode.Categories;
        }
        if (mode == Mode.User) {
            return Mode.User;
        }
        return null;
    }
}
