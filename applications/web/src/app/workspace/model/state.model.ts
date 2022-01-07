import { EntityState } from "@ngrx/entity";

export interface IState<T, F> extends EntityState<T> {
    /* TODO!!! */
    summaryActivePage: number;
    summaryIds: string[];
    summaryFilter: F;
    chartYear: number | null;
    chartYears: number[];
}

export interface IEntity {
    id: string;
    createdAt: Date;
}

export interface IEntityFilter {
    any(): boolean;
    process(item: IEntity): boolean;
}

export interface IItem<T> {
    key: T;
    value: number;
}

export interface IChartPoint {
    x: string;
    y: number;
}

export interface IChartSection {
    name: string;
    value: number;
}

export class Item<T> implements IItem<T> {
    constructor(public key: T, public value: number) {}
}

export class ChartPoint implements IChartPoint {
    public x: string;
    public y: number;

    constructor(x: string, y: number) {
        this.x = x;
        this.y = y.round2();
    }
}

export class ChartSection implements IChartSection {
    public name: string;
    public value: number;

    constructor(name: string, rate: number, value: number) {
        this.name = `${name} (${rate.toFixed(2)}%)`;
        this.value = value.round2();
    }
}
