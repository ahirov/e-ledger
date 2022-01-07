import { Injectable } from "@angular/core";
import * as _ from "lodash";

export enum ScssVariables {
    Success = "success",
    Primary = "primary",
    Light = "light",
    Dark = "dark",
}

@Injectable()
export class ChartService{
    public styles: { [key in ScssVariables]: string | null } = {
        success: null,
        primary: null,
        light: null,
        dark: null,
    };

    constructor() {
        const stypes = window.getComputedStyle(document.body);
        _.forOwn(this.styles, (_value, key: ScssVariables) => {
            this.styles[key] = stypes.getPropertyValue("--bs-" + key);
        });
    }
}
