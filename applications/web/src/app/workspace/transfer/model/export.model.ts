import { Dictionary } from "@ngrx/entity";
import { Extension } from "./extension.mode";
import { WorkSheet } from "xlsx";

export interface IExportFilter {
    from: Date;
    to: Date;
    extension: Extension;
}

export interface IExportService<T> {
    getItems(filter: IExportFilter, items: Dictionary<T>): T[];
    getWorkSheet(filter: IExportFilter, items: T[]): WorkSheet;
}

export class ExportFilter implements IExportFilter {
    constructor(
        public from: Date,
        public to: Date,
        public extension: Extension,
    ) {}
}
