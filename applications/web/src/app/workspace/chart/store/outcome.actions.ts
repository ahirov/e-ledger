import { createAction, props } from "@ngrx/store";
import { IChartPoint, IChartSection } from "../model/chart.model";

export const SET_YEAR     = "[Chart][Outcome] Set year";
export const SET_POINTS   = "[Chart][Outcome] Set points";
export const SET_SECTIONS = "[Chart][Outcome] Set sections";
export const PROCESS_YEAR     = "[Chart][Outcome] Process year";
export const PROCESS_POINTS   = "[Chart][Outcome] Process points";
export const PROCESS_SECTIONS = "[Chart][Outcome] Process sections";

export const setYear = createAction(
    SET_YEAR,
    props<{ payload: number | null }>(),
);
export const setPoints = createAction(
    SET_POINTS,
    props<{ payload: IChartPoint[] }>(),
);
export const setSections = createAction(
    SET_SECTIONS,
    props<{ payload: IChartSection[] }>(),
);
export const processYear = createAction(PROCESS_YEAR);
export const processPoints = createAction(PROCESS_POINTS);
export const processSections = createAction(PROCESS_SECTIONS);
