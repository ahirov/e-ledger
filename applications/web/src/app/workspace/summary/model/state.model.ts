import { IIncomeFilter } from "./income.model";
import { IOutcomeFilter } from "./outcome.model";

interface IPartState<F> {
    readonly filter: F;
    readonly page: number;
    readonly ids: string[];
}

export interface IIncomeState extends IPartState<IIncomeFilter> {}
export interface IOutcomeState extends IPartState<IOutcomeFilter> { }

export interface ISummaryState {
    readonly income: IIncomeState;
    readonly outcome: IOutcomeState;
}
