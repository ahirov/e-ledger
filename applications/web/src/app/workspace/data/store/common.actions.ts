import { createAction } from "@ngrx/store";

export const SET_SAVED   = "[Data] Set saved";
export const SET_UNSAVED = "[Data] Set unsaved";
export const setSaved   = createAction(SET_SAVED);
export const setUnsaved = createAction(SET_UNSAVED);
