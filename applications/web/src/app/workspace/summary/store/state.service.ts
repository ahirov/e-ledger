import { Injectable } from "@angular/core";
import { Dictionary } from "@ngrx/entity";

import { IEntity, IEntityFilter } from "../../data/model/state.model";
import { environment } from "applications/web/src/environments/environment";
import * as _ from "lodash";

@Injectable()
export class StateService {
    public getIds<F extends IEntityFilter, I extends IEntity>(
        filter: F,
        rawItems: Dictionary<I>,
    ): string[] {
        const items = filter.any()
            ? _.filter(rawItems, (item: I): boolean => filter.process(item))
            : rawItems;
        return _.map(
            _.orderBy(items, (item: I): any => item.createdAt, "desc"),
            (item: I): string => item.id,
        );
    }

    public checkActivePage(
        activePage: number,
        pagesCount: number,
    ): { payload: number } | null {
        return activePage >= pagesCount ? { payload: pagesCount - 1 } : null;
    }

    public selectActivePage(
        page: number,
        itemsCount: number,
    ): { payload: number } | null {
        return page >= 0 &&
            page < _.ceil(itemsCount / environment.pageItemsCount)
            ? { payload: page }
            : null;
    }
}
