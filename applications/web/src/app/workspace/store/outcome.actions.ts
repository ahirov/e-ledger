import { createAction, props } from "@ngrx/store";
import { IOutcome } from "../model/outcome.model";

export const ADD_OUTCOME    = "[Outcome] Add outcome";
export const ADD_OUTCOMES   = "[Outcome] Add outcomes";
export const DELETE_OUTCOME = "[Outcome] Delete outcome";
export const SELECT_PAGE    = "[Outcome] Select page";

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
