import { createAction, props } from "@ngrx/store";
import { IChartPoint, IChartSection } from "../chart.model";

export const SET_YEAR     = "[Chart][Income] Set year";
export const SET_POINTS   = "[Chart][Income] Set points";
export const SET_SECTIONS = "[Chart][Income] Set sections";
export const PROCESS_YEAR     = "[Chart][Income] Process year";
export const PROCESS_POINTS   = "[Chart][Income] Process points";
export const PROCESS_SECTIONS = "[Chart][Income] Process sections";

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
