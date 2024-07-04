export type IMemberBase = {
  index?: number;
  name: string;
  title: string;
  shortTitle: string;
  isVisible: boolean;
  public: boolean;
  type?: string;
  meta?: {
    member_groups: string[];
  };
};

export type IAvailableMembers = IMemberBase & {
  type: string;
  suggestFilterValues: boolean;
  primaryKey: boolean;
};

export type IMemberDimensions = IMemberBase;

export type IMemberMeasures = IMemberBase;

export type IMemberSegments = IMemberBase;

export type IMemberOrder = {
  id: string;
  title: string;
  order: string;
};

export type IMemberGroupBase = {
  title?: string;
  titleModal?: string;
  dataSource: TreeDataNode[];
};

export type ICubeNode = {
  title: string;
  key: string;
  public?: boolean;
  children: ICubeNode[];
};

export type IQueryExplore = {
  dimensions: string[];
  measures: string[];
  order: string[][];
};
