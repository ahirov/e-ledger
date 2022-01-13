import { createAction, props } from "@ngrx/store";
import { IOutcome } from "../model/outcome.model";

export const ADD_OUTCOME    = "[Workspace][Outcome] Add outcome";
export const ADD_OUTCOMES   = "[Workspace][Outcome] Add outcomes";
export const DELETE_OUTCOME = "[Workspace][Outcome] Delete outcome";
export const PROCESS_YEARS  = "[Workspace][Outcome] Process years";
export const SET_YEARS      = "[Workspace][Outcome] Set years";

export const addOutcome = createAction(
    ADD_OUTCOME,
    props<{ payload: IOutcome }>(),
);
export const addOutcomes = createAction(
    ADD_OUTCOMES,
    props<{ payload: IOutcome[] }>(),
);
export const deleteOutcome = createAction(
    DELETE_OUTCOME,
    props<{ payload: string }>(),
);
export const processYears = createAction(
    PROCESS_YEARS,
    props<{ payload: IOutcome[] }>(),
);
export const setYears = createAction(
    SET_YEARS,
    props<{ payload: number[] }>()
);
