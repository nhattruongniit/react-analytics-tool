// Purpose: Adapter class to convert the multi-step query to ReactFlow format.

// types
import { IEdges, IFlowConfigItem } from "@src/types/explorer";
import { MarkerType } from "reactflow";

export default class ReactFlowAdapter {
  private static instance: ReactFlowAdapter = new ReactFlowAdapter();
  public edges: IEdges[];

  constructor() {
    this.edges = [];
  }

  public static getInstance(): ReactFlowAdapter {
    if (this.instance === null) {
      this.instance = new ReactFlowAdapter();
    }
    return this.instance;
  }

  public initializeEdges(nodes: IFlowConfigItem | null) {
    if (!nodes) return [];
    const edges: any[] = [];
    for (const key in nodes) {
      const node = nodes[key];
      node.dependencies.forEach((dependency) => {
        edges.push({
          id: `${dependency}-${key}`,
          source: dependency,
          target: key,
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        });
      });
    }
    this.edges = edges;
    return this.edges;
  }
}
