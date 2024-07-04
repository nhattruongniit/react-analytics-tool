import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// context
import { useMultiStepQuery } from "@src/contexts/multi-step-query-context";

function AddNodeButton() {
  const { updateMethodsQuerySidebar, updateMethodsNode } = useMultiStepQuery();

  function addNode() {
    updateMethodsNode.setNode(null); // set node to null
    updateMethodsQuerySidebar.open(true); // set mode to add node
  }

  return (
    <Button type="dashed" className="border-gray-300 border-r-[1px] px-[8px] ml-2" onClick={addNode}>
      Add node <PlusOutlined />
    </Button>
  );
}

export default AddNodeButton;
