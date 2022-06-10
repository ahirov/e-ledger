import { EntityState } from "@ngrx/entity";
import { IIncomeData } from "./income.model";
import { IOutcomeData } from "./outcome.model";

interface IPartState<T> extends EntityState<T> {
    readonly years: number[];
}

export interface IIncomeState extends IPartState<IIncomeData> {}
export interface IOutcomeState extends IPartState<IOutcomeData> {}

export interface IDataState {
    readonly income: IIncomeState;
    readonly outcome: IOutcomeState;
}

export interface IEntity {
    readonly id: string;
    readonly created: Date;
}

export interface IEntityFilter {
    any(): boolean;
    process(item: IEntity): boolean;
}
