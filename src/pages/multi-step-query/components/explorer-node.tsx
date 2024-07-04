import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import { Handle, Position } from "reactflow";

// types
import { INodeItem } from "@src/types/explorer";

// contexts
import { useMultiStepQuery } from "@src/contexts/multi-step-query-context";

function ExplorerNode(node: INodeItem) {
  const { updateMethodsNode } = useMultiStepQuery();

  return (
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center justify-between">
        <div className="text-[8px] max-w-[100px] text-left bg-[#e6f4ff] border-[#91caff] border-solid border-[1px] rounded text-[#1677ff] px-2 py-1">
          <Tooltip title={node.data.label}>
            <div className="truncate">{node.data.label}</div>
          </Tooltip>
        </div>
        <div className="flex items-center">
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete the node"
              description="Are you sure to delete this node?"
              onConfirm={() => {
                updateMethodsNode.remove(node);
              }}
              showCancel={false}
              okText="Yes"
            >
              <Button
                danger
                type="text"
                size="small"
                className="shrink-0 m-0 p-0 flex items-center justify-center w-[16px] h-[16px]"
                icon={<DeleteOutlined style={{ fontSize: 10 }} />}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="text-[10px] w-full text-center break-word">{node.data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ExplorerNode;
