export const DEFAULT_QUERY_BUILDER = {
  dimensions: ["firebase.app_id"],
  measures: ["firebase.event_count"],
  order: [["firebase.app_id", "asc"]],
};

export type IAdapterObject = {
  label: string;
  value: string;
};

export const ADAPTER_QUERY_BUILDER: Record<string, IAdapterObject> = {
  cube: {
    label: "Explorer",
    value: "cube",
  },
  "dbt-like": {
    label: "Dbt like",
    value: "dbt-like",
  },
};
