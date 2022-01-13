import { EntityState } from "@ngrx/entity";
import { IIncome } from "./income.model";
import { IOutcome } from "./outcome.model";

interface IPartState<T> extends EntityState<T> {
    years: number[];
}

export interface IEntity {
    id: string;
    createdAt: Date;
}

export interface IEntityFilter {
    any(): boolean;
    process(item: IEntity): boolean;
}

export interface IIncomeState extends IPartState<IIncome> { }
export interface IOutcomeState extends IPartState<IOutcome> { }

export interface IState {
    income: IIncomeState;
    outcome: IOutcomeState;
}
