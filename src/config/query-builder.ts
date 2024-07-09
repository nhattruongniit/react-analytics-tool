// assets
import LeftOuter from "@src/assets/images/left-outer.svg";
import RightOuter from "@src/assets/images/right-outer.svg";
import Inner from "@src/assets/images/inner.svg";
import FullOuter from "@src/assets/images/full-outer.svg";
import Cross from "@src/assets/images/cross.svg";

// types
import { IJoinType } from "@src/types/blender";

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

export const JOIN_TYPE: Record<string, IJoinType> = {
  INNER: {
    value: "INNER",
    label: "Inner",
    img: Inner,
    description: "Returns matching rows from the right table, plus non-matching rows from the left tables",
  },
  LEFT: {
    value: "LEFT",
    label: "Left outer",
    img: LeftOuter,
    description: "Returns matching rows from the left tables, plus non-matching rows from the right table",
  },
  RIGHT: {
    value: "RIGHT",
    label: "Right outer",
    img: RightOuter,
    description: "Returns only matching rows from the left and right tables",
  },
  FULL: {
    value: "FULL",
    label: "Full outer",
    img: FullOuter,
    description: "Returns all rows from the left tables and right table, whether they match or not",
  },
  CROSS: {
    value: "CROSS",
    label: "Cross",
    img: Cross,
    description: "Returns every possible combination of rows from the left and right tables",
  },
};
