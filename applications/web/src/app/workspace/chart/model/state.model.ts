import { IChartPoint, IChartSection } from "./chart.model";

interface IPartState {
    readonly year: number | null;
    readonly points: IChartPoint[];
    readonly sections: IChartSection[];
}

export interface IIncomeState extends IPartState {}
export interface IOutcomeState extends IPartState {}

export interface IChartState {
    readonly income: IIncomeState;
    readonly outcome: IOutcomeState;
}
