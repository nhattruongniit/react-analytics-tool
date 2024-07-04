import React from "react";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Radio, Tooltip } from "antd";

// components
import MemberItem from "./member-item";
import { AGGREGATE } from "@src/config/blend-explorer";

export default function BlendMeasure() {
  const [openPopover, setOpenPopover] = React.useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  return (
    <>
      <MemberItem title="Measures">
        <div className="blend-member flex items-center mb-1 text-[#000] h-[22px] bg-[#bae0ff]">
          <div className="member-measure flex items-center shrink-0 border-0 border-solid border-r-[1px] border-white cursor-pointer h-full">
            <Popover
              rootClassName="member-popover"
              placement="topRight"
              content={
                <div className="">
                  <div className="border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-solid mb-4">
                    <div className="text-[12px]">Alias name</div>
                    <div className="my-1">
                      <Input className="p-0" placeholder="(Enter alias name)" variant="borderless" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] mb-2">Aggregation</div>
                    <Radio.Group className="flex flex-col">
                      {Object.keys(AGGREGATE).map((key) => (
                        <Radio key={key} value={AGGREGATE[key].value}>
                          <span className="text-[12px]">{AGGREGATE[key].label}</span>
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
              }
              title={
                <div className="flex items-center text-[12px] font-normal">
                  <div className="px-1 w-[30px] text-center">
                    <div className="uppercase text-[9px]">SUM</div>
                  </div>
                  <Tooltip title="firebase__event_timestamp_day">
                    <div className="p-1 w-full truncate">firebase__event_timestamp_day</div>
                  </Tooltip>
                </div>
              }
              trigger="click"
              open={openPopover}
              onOpenChange={handleOpenChange}
            >
              <div className="px-1 w-[30px] text-center">
                <div className="member-operator uppercase text-[9px]">SUM</div>
                <div className="member-icon-edit">
                  <EditOutlined />
                </div>
              </div>
            </Popover>
          </div>
          <Tooltip title="firebase__event_timestamp_day">
            <div className="p-1 w-full truncate">firebase__event_timestamp_day</div>
          </Tooltip>
          <Button danger type="text" size="small" icon={<CloseOutlined />} className="btn-close" />
        </div>
      </MemberItem>
    </>
  );
}
