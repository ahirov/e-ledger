import { EntityState } from "@ngrx/entity";

export interface IState<T> extends EntityState<T> {
    activePage: number;
}
