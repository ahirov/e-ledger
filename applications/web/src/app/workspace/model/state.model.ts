import { EntityState } from "@ngrx/entity";

export interface IState<T> extends EntityState<T> {
    activePage: number;
    outputIds: string[];
}

export interface IEntity {
    id: string;
    createdAt: Date;
}

export interface IEntityFilter {
    any(): boolean;
    process(item: IEntity): boolean;
}
