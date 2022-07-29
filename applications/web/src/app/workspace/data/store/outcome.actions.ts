import { createAction, props } from "@ngrx/store";
import { IOutcomeData } from "../model/outcome.model";

export const ADD_OUTCOME     = "[Workspace][Outcome] Add outcome";
export const ADD_OUTCOMES    = "[Workspace][Outcome] Add outcomes";
export const DELETE_OUTCOME  = "[Workspace][Outcome] Delete outcome";
export const DELETE_OUTCOMES = "[Workspace][Outcome] Delete outcomes";
export const PROCESS_YEARS   = "[Workspace][Outcome] Process years";
export const SET_YEARS       = "[Workspace][Outcome] Set years";
export const CLEAR           = "[Workspace][Outcome] Clear";

export const addOutcome = createAction(
    ADD_OUTCOME,
    props<{ payload: IOutcomeData }>(),
);
export const addOutcomes = createAction(
    ADD_OUTCOMES,
    props<{ payload: IOutcomeData[] }>(),
);
export const deleteOutcome = createAction(
    DELETE_OUTCOME,
    props<{ payload: string }>(),
);
export const deleteOutcomes = createAction(
    DELETE_OUTCOMES,
    props<{ payload: string[] }>(),
);
export const processYears = createAction(
    PROCESS_YEARS,
    props<{ payload: IOutcomeData[] }>(),
);
export const setYears = createAction(SET_YEARS, props<{ payload: number[] }>());
export const clear = createAction(CLEAR);
