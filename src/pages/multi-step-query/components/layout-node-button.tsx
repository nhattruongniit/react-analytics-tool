import React from "react";
import { Button, theme } from "antd";
import { useMultiStepQuery } from "@src/contexts/multi-step-query-context";

function LayoutNodeButton() {
  const { updateMethodsNode } = useMultiStepQuery();
  const direction = updateMethodsNode.getDirection();
  const { token } = theme.useToken();
  return (
    <>
      <Button
        type="dashed"
        className="border-gray-300 border-r-[1px] px-[8px]"
        onClick={() => updateMethodsNode.setLayoutDirection("TB")}
        style={{
          color: direction === "TB" ? token.colorPrimary : token.colorTextBase,
        }}
      >
        Vertical layout
      </Button>
      <Button
        type="dashed"
        className="border-gray-300 border-r-[1px] px-[8px] mx-2"
        onClick={() => updateMethodsNode.setLayoutDirection("LR")}
        style={{
          color: direction === "LR" ? token.colorPrimary : token.colorTextBase,
        }}
      >
        Horizontal layout
      </Button>
    </>
  );
}

export default LayoutNodeButton;
