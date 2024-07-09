export type IDropdownOption = {
  value: string;
  label: string;
  title?: string;
};

export type IOptionAvailable = {
  name: string;
  alias: string;
  type: string;
  args: string[];
  step?: string;
  aggregation?: string;
};

export type IMeasureBlender = {
  name: string;
  alias: string | null;
  type: string;
  aggregation: string;
  args: string[];
  step?: string;
};

export type IDimensionBlender = {
  name: string;
  alias: string | null;
  type: string;
  args: string[];
  step?: string;
  aggregation?: string;
};

export type IMeasureBlender = {
  name: string;
  alias: string;
  type: string;
  aggregation: string;
  args: string[];
  step?: string;
};

export type IFiltersBlender = {
  name: string;
  and: [{ type: string; args: string[] }];
};

export type INodeBlenderItem = {
  query_step_alias: string;
  source_alias: string;
  dimensions: IDimensionBlender[];
  measures: IMeasureBlender[];
  filters: IFiltersBlender[];
};

export type IJoinOn = {
  type: string;
  args: string[];
};

export type IJoinItem = {
  join_type: string;
  on: IJoinOn[];
};

export type IFormBlender = {
  alias: string;
  sources: INodeBlenderItem[];
  joins: IJoinItem[];
  dimensions: IDimensionBlender[];
};

export type IJoinType = {
  value: string;
  label: string;
  img: string;
  description: string;
};
