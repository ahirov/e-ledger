import { createAction, props } from "@ngrx/store";
import { IOutcome, IOutcomeFilter } from "../model/outcome.model";

export const ADD_OUTCOME    = "[Outcome] Add outcome";
export const ADD_OUTCOMES   = "[Outcome] Add outcomes";
export const DELETE_OUTCOME = "[Outcome] Delete outcome";
export const SELECT_PAGE    = "[Outcome] Select page";
export const PROCESS_PAGE   = "[Outcome] Process page";
export const SET_PAGE       = "[Outcome] Set page";
export const SET_YEAR       = "[Outcome] Set year";
export const SET_FILTER     = "[Outcome] Set filter";
export const SET_OUTPUT     = "[Outcome] Set output";
export const PROCESS_OUTPUT = "[Outcome] Process output";

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
export const selectPage = createAction(
    SELECT_PAGE,
    props<{ payload: number }>(),
);
export const processPage = createAction(PROCESS_PAGE);
export const setPage = createAction(
    SET_PAGE,
    props<{ payload: number }>()
);
export const setYear = createAction(
    SET_YEAR,
    props<{ payload: number | null }>()
);
export const setFilter = createAction(
    SET_FILTER,
    props<{ payload: IOutcomeFilter }>(),
);
export const setOutput = createAction(
    SET_OUTPUT,
    props<{ payload: string[] }>(),
);
export const processOutput = createAction(PROCESS_OUTPUT);
