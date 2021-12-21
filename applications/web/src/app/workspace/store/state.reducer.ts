import { IState } from "../model/state.model";
import { environment } from "applications/web/src/environments/environment";
import * as _ from "lodash";

export function getActivePage<T>(payload: number, state: IState<T>) {
    return payload >= 0 &&
        payload < _.ceil(state.ids.length / environment.pageItemsCount)
        ? payload
        : state.activePage;
}
