import { IQueryExplore } from "./query-builder";

export enum ChartType {
  Line = "line",
  Bar = "bar",
  Table = "table",
}

export type IOrderQuery = {
  [key: string]: string;
};

export type ITimeDimensions = {
  dimension: string;
  granularity: string;
  dateRange: string;
};

export type IPivot = {
  x: string[];
  y: string[];
  fillMissingDates: boolean;
  joinDateRange: boolean;
};

export type IChart = {
  id: number;
  name: string;
  action?: "add" | "edit" | "delete";
  vizState: {
    query: IQueryExplore;
    chartType: string;
    pivotConfig?: IPivot;
  };
};

export type IKeyChart = {
  [keyChart: string]: IChart;
};

export type IChartProduct = {
  [keyChart: string]: IChart;
};
