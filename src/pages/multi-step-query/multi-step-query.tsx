import React from "react";
import ReactFlow, { Background, Controls, MiniMap, Panel, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";

// components
import AddNodeButton from "./components/add-node-button";
import ExplorerNode from "./components/explorer-node";
import QuerySidebar from "./query-sidebar";
import Visualization from "./visualization";
import LayoutNodeButton from "./components/layout-node-button";
import MonancoPanel from "./components/monaco-panel";

// contexts
import { useMultiStepQuery } from "@src/contexts/multi-step-query-context";
import { WareHouseContextProvider } from "@src/contexts/warehouse-context";

function MultiStepQuery() {
  const { fitView } = useReactFlow();
  const { layoutedNodes, layoutedEdges, updateMethodsNode } = useMultiStepQuery();
  const nodeTypes = React.useMemo(() => ({ explorerNode: ExplorerNode }), []);
  const direction = updateMethodsNode.getDirection();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdge] = useEdgesState([]);

  React.useEffect(() => {
    setNodes(layoutedNodes);
    setEdge(layoutedEdges);
    window.requestAnimationFrame(() => {
      fitView();
    });
    // eslint-disable-next-line
  }, [layoutedNodes, layoutedEdges, setNodes, setEdge, direction]);

  return (
    <WareHouseContextProvider>
      <div className="w-full h-full flex">
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-full">
            <ReactFlow
              fitView
              deleteKeyCode={null}
              nodes={nodes}
              nodeTypes={nodeTypes}
              edges={edges}
              onNodesChange={onNodesChange}
              onNodeClick={(_, node) => updateMethodsNode.view(node.data.label)}
            >
              <Controls />
              <MiniMap />
              <Panel position="top-right">
                <LayoutNodeButton />
                <MonancoPanel />
                <AddNodeButton />
              </Panel>
              <Background gap={12} size={1} />
            </ReactFlow>
          </div>
          {/* visualization */}
          <Visualization />
        </div>

        <QuerySidebar />
      </div>
    </WareHouseContextProvider>
  );
}

export default MultiStepQuery;
