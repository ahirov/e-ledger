import { IIncomeFilter } from "./income.model";
import { IOutcomeFilter } from "./outcome.model";

interface IPartState<F> {
    filter: F;
    page: number;
    ids: string[];
}

export interface IIncomeState extends IPartState<IIncomeFilter> {}
export interface IOutcomeState extends IPartState<IOutcomeFilter> { }

export interface IState {
    income: IIncomeState;
    outcome: IOutcomeState;
}
