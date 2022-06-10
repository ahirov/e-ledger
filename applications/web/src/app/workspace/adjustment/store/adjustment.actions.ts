import { createAction, props } from "@ngrx/store";

import { DialogMode } from "../model/state.model";
import { ICredentials } from "../model/credentials.model";
import { IAuthRequest } from "../../../auth/model/request.model";
import { ICategory } from "../model/outcome.model";
import { ISource } from "../model/income.model";

export const SAVE_ENUMS    = "[Adjustment] Save enums";
export const REFRESH_ENUMS = "[Adjustment] Refresh enums";

export const SAVE_SETTINGS  = "[Adjustment] Save settings";
export const LOGIN_SETTINGS = "[Adjustment] Login settings";
export const SET_ERROR = "[Adjustment] Set error";
export const SET_MODE  = "[Adjustment] Set mode";

export const saveEnums = createAction(
    SAVE_ENUMS,
    props<{ payload: { sources: ISource[]; categories: ICategory[] } }>(),
);
export const refreshEnums = createAction(REFRESH_ENUMS);

export const saveSettings = createAction(
    SAVE_SETTINGS,
    props<{ payload: ICredentials }>(),
);
export const loginSettings = createAction(
    LOGIN_SETTINGS,
    props<{
        payload: { request: IAuthRequest; credentials: ICredentials };
    }>(),
);
export const setError = createAction(
    SET_ERROR,
    props<{ payload: string | null }>(),
);
export const setMode = createAction(SET_MODE, props<{ payload: DialogMode }>());
