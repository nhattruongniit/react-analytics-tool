import React from "react";
import { createContext, PropsWithChildren, useContext } from "react";
import { Node, Edge } from "reactflow";
import dagre from "dagre";

// types
import {
  IExplorerNode,
  IFlowConfigItem,
  IMultiStepModal,
  IMultiStepQueryContextType,
  INodeItem,
  TYPE_MODAL,
} from "@src/types/explorer";

// hooks
import { useLocalStorage } from "@src/hooks/use-localstorage";

// config
import { NAME_STORAGE } from "@src/config/storage";
import { ADAPTER_QUERY_BUILDER } from "@src/config/query-builder";

// adapter
import { ReactFlowAdapter } from "@src/adapter";
import { message } from "antd";

export const MultiStepQueryContext = createContext<IMultiStepQueryContextType>({} as IMultiStepQueryContextType);

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = "TB") => {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: any) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = direction === "TB" ? "left" : "top";
    node.sourcePosition = direction === "TB" ? "right" : "bottom";
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export const MultiStepQueryContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // states
  const [collapseQuerySidebar, setCollapseQuerySidebar] = React.useState<IMultiStepModal>({
    isOpen: false,
    type: "create",
  });
  const [explorerNode, setExplorerNode] = React.useState<IExplorerNode | null>(null);
  const [nodeType, setNodeType] = React.useState(ADAPTER_QUERY_BUILDER.cube.value);
  const [timestamps, setTimestamp] = React.useState(Date.now());
  const [visualization, setVisualization] = React.useState<any>(null);
  const [isCollapsedVisualization, setIsCollapsedVisualization] = React.useState(false);
  const [direction, setDirection] = React.useState("TB");
  const [builderType, setBuilderType] = React.useState("QUERY_BUILDER"); // ["QUERY_BUILDER", "JSON_EDITOR"]
  // hooks
  const [messageApi, contextHolder] = message.useMessage();
  // storage
  const [nodeBase, setNodeBase] = useLocalStorage<any>(NAME_STORAGE.NODE_BASE, null);
  // context
  // reactflow
  const [initialNodes, setInitialNodes] = React.useState<Node[]>([]);
  const [initialEdges, setInitialEdges] = React.useState<Edge[]>([]);

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges, direction);

  // initialize react flow
  React.useEffect(() => {
    if (nodeBase) {
      const keys = Object.keys(nodeBase);
      const nodes: any = [];
      keys.forEach((key) => {
        const newNode = {
          id: key,
          data: { label: key },
          type: "explorerNode",
          position: { x: 0, y: 0 },
          connectable: false,
        };
        nodes.push(newNode);
      });
      setInitialNodes(nodes);
      const reactflowAdapter = new ReactFlowAdapter();
      const initialEdges = reactflowAdapter.initializeEdges(nodeBase);
      setInitialEdges(initialEdges);
    }
  }, [nodeBase]);

  function prepareRenderProps() {
    const updateMethodsNode = () => ({
      add: (nodeItem: IExplorerNode) => {
        setNodeBase((prev: IFlowConfigItem) => {
          return {
            ...prev,
            [nodeItem.alias]: {
              ...nodeItem,
            },
          };
        });
        forceChangeTimestamp();
      },
      view: (alias: string) => {
        const nodeItem = nodeBase[alias];
        setExplorerNode(nodeItem);
        setNodeType(nodeItem.adapter_name); // set node type
        updateMethodsQuerySidebar().open(true, "view"); // set mode edit
        setBuilderType(nodeItem.adapter_name); // set builder type
      },
      remove: (node: INodeItem) => {
        const isDependency = layoutedEdges.some((edge) => edge.source === node.data.label);
        if (isDependency) {
          messageApi.open({
            type: "error",
            content: "Cannot delete node with dependencies",
          });
          return;
        }
        const clonedNodes = { ...nodeBase };
        delete clonedNodes[node.data.label];

        updateMethodsQuerySidebar().close();
        setNodeBase(clonedNodes);
      },
      setNode: (nodeItem: IExplorerNode | null) => {
        setExplorerNode(nodeItem);
      },
      getNodeBase: (): IFlowConfigItem | null => {
        return nodeBase || null;
      },
      setVisualization: (visualization: any | null) => {
        setVisualization(visualization);
      },
      setLayoutDirection: (direction: string) => {
        setDirection(direction);
      },
      getDirection: () => {
        return direction;
      },
      setBuilderType: (type: string) => {
        setBuilderType(type);
      },
      getBuilderType: () => {
        return builderType;
      },
    });

    const updateMethodsQuerySidebar = () => ({
      open: (isOpen: boolean, type: TYPE_MODAL = "create") => {
        setCollapseQuerySidebar({
          isOpen,
          type,
        });
      },
      close: () => {
        setCollapseQuerySidebar(() => ({
          isOpen: false,
          type: "create",
        }));
      },
    });

    const updateNodeType = (type: string) => {
      setNodeType(type);
    };

    const forceChangeTimestamp = () => {
      setTimestamp(Date.now());
    };

    const openCollapseVisualization = (isCollapsed: boolean) => {
      setIsCollapsedVisualization(isCollapsed);
    };

    return {
      // states
      collapseQuerySidebar,
      nodeType,
      explorerNode,
      timestamps,
      layoutedNodes,
      layoutedEdges,
      visualization,
      isCollapsedVisualization,
      // actions
      messageApi,
      forceChangeTimestamp,
      updateNodeType,
      updateMethodsQuerySidebar: updateMethodsQuerySidebar(),
      updateMethodsNode: updateMethodsNode(),
      openCollapseVisualization,
    };
  }

  return (
    <MultiStepQueryContext.Provider
      value={{
        ...prepareRenderProps(),
      }}
    >
      {contextHolder}
      {children}
    </MultiStepQueryContext.Provider>
  );
};

export const useMultiStepQuery = () => useContext(MultiStepQueryContext);
