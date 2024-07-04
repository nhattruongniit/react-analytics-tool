import React from "react";
import { Button, Modal } from "antd";

// components
import CodeEditor from "@src/components/editor/code-editor";

// contexts
import { useMultiStepQuery } from "@src/contexts/multi-step-query-context";

function MonancoPanel() {
  const { updateMethodsNode, messageApi } = useMultiStepQuery();
  // states
  const [openModalEditor, setOpenModalEditor] = React.useState(false);

  function closeModalEditor() {
    setOpenModalEditor(false);
  }

  const nodeBase = updateMethodsNode.getNodeBase();

  return (
    <>
      <Button
        type="dashed"
        className="border-gray-300 border-r-[1px] px-[8px]"
        onClick={() => setOpenModalEditor(true)}
      >
        JSON editor
      </Button>

      <Modal
        key={Number(openModalEditor)}
        title="JSON Editor"
        open={openModalEditor}
        width={850}
        className="modal-analytics"
        okText="Import"
        okButtonProps={{ hidden: true }}
        onCancel={closeModalEditor}
      >
        <CodeEditor
          code={JSON.stringify(nodeBase, null, 2)}
          onValidate={(markers) => {
            if (markers.length > 0) {
              messageApi.error("Invalid JSON format");
            }
          }}
        />
      </Modal>
    </>
  );
}

export default MonancoPanel;
