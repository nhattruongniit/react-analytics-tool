import React from "react";
import { NodeIndexOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Divider, Input, Popover, theme } from "antd";

function JoinAnotheStep() {
  const { token } = theme.useToken();
  const [openPopover, setOpenPopover] = React.useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  return (
    <div className="relative pl-3 shrink-0">
      <Popover
        placement="bottom"
        content={
          <>
            <Input allowClear className="mb-2" placeholder="Search step" />
            <div className="max-h-[200px] overflow-auto">
              <div className="border-[#E0E0E0] dark:border-[#2b2b2b] border-[1px] rounded-md border-solid mb-1 cursor-pointer py-1 px-2 flex items-center hover:bg-gray-100 dark:hover:bg-black">
                <NodeIndexOutlined className="mr-2" />
                <div>tony</div>
              </div>
              <div className="border-[#E0E0E0] dark:border-[#2b2b2b] border-[1px] rounded-md border-solid mb-1 cursor-pointer py-1 px-2 flex items-center hover:bg-gray-100 dark:hover:bg-black">
                <NodeIndexOutlined className="mr-2" />
                <div>tony</div>
              </div>
            </div>
          </>
        }
        title="Add step"
        trigger="click"
        open={openPopover}
        onOpenChange={handleOpenChange}
      >
        <Divider className="absolute top-1/2 left-0 m-0 bg-blue-700" />
        <div className="flex flex-col items-center justify-between relative p-2 cursor-pointer border-[#E0E0E0] border-[1px] dark:border-[#2b2b2b] rounded-md border-solid bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-[#141414]">
          <div className="text-center mb-2">Join another step</div>
          <PlusCircleOutlined style={{ color: token.colorPrimary }} />
        </div>
      </Popover>
    </div>
  );
}

export default JoinAnotheStep;
