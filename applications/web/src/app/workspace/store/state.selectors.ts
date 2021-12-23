import { Dictionary } from "@ngrx/entity";
import { IState } from "../model/state.model";
import { environment } from "applications/web/src/environments/environment";
import * as _ from "lodash";

const itemsPerPage = environment.pageItemsCount;
export const selectors = {
    items: <T>(state: IState<T>): Dictionary<T> => state.entities,
    activePage: <T>(state: IState<T>): number => state.activePage,
    pagesCount: <T>(state: IState<T>): number =>
        _.ceil(state.outputIds.length / itemsPerPage),
    pageItems: <T>(state: IState<T>): T[] => {
        const items = state.outputIds.map(id => <T>state.entities[id]);
        const start = state.activePage * itemsPerPage;
        const end = start + itemsPerPage;
        return _.slice(items, start, end);
    },
    previewItems: <T>(state: IState<T>): T[] => {
        const ids = _.takeRight(
            <string[]>state.ids,
            environment.pagePreviewItemsCount,
        );
        return _.map(ids, id => <T>state.entities[id]);
    },
    outputCount: <T>(state: IState<T>): number => state.outputIds.length,
};
