import { ISource } from "../../adjustment/model/income.model";
import { ICategory } from "../../adjustment/model/outcome.model";

export interface IImportService<T> {
    processItems(
        data: any[],
        list: ISource[] | ICategory[],
        items?: T[],
    ): { total: number; deleted: number };
}
