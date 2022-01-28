import { Dictionary } from "@ngrx/entity";

export interface IImportService<T> {
    processItems(
        data: any[],
        items?: Dictionary<T>,
    ): { total: number; deleted: number };
}
