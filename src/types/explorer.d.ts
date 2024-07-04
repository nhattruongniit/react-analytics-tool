import { Node, Edge } from "reactflow";
import { MessageMethods } from "antd/lib/message";

export type IMultiStepQueryContextType = {
  // states
  collapseQuerySidebar: IMultiStepModal;
  nodeType: string;
  explorerNode: IExplorerNode | null;
  timestamps: number;
  layoutedEdges: Edge[];
  layoutedNodes: Node[];
  visualization: any | null;
  isCollapsedVisualization: boolean;
  // actions
  messageApi: MessageMethods;
  forceChangeTimestamp: () => void;
  updateNodeType: (type: string) => void;
  updateMethodsQuerySidebar: {
    open: (isOpen: boolean, type?: TYPE_MODAL) => void;
    close: () => void;
  };
  updateMethodsNode: {
    add: (nodeItem: IExplorerNode) => void;
    view: (alias: string) => any;
    setNode: (node: IExplorerNode | null) => void;
    remove: (nodes: INodeItem) => void;
    getNodeBase: () => IFlowConfigItem | null;
    setVisualization: (visualization: any | null) => void;
    setLayoutDirection: (direction: string) => void;
    getDirection: () => string;
    getBuilderType: () => string;
    setBuilderType: (type: string) => void;
  };
  openCollapseVisualization: (isCollapsed: boolean) => void;
};

export type JSONQueryType = {
  measures: string[];
  dimensions: string[];
  order: string[][];
};

export type IExplorerNode = {
  adapter_name: string;
  alias: string;
  dependencies: string[];
  name: string;
  model_config: {
    json_query?: JSONQueryType;
    query?: string;
  };
};

export type IFlowConfigItem = {
  [alias in string]: IExplorerNode;
};

export type INodeItem = {
  dragHandle?: string | undefined;
  dragging: boolean;
  id: string;
  data: {
    label: string;
  };
  type: string;
  xPos: number;
  yPos: number;
  selected: boolean;
  isConnectable: boolean;
  sourcePosition?: string;
  targetPosition?: string;
  dragging: boolean;
  zIndex: number;
};

export type IEdges = {
  id: string;
  source: string;
  target: string;
  animated: boolean;
};

export type TYPE_MODAL = "create" | "view";

export type IMultiStepModal = {
  isOpen: boolean;
  type: TYPE_MODAL;
};
