import { CloseOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

// components
import MemberItem from "./member-item";

export default function BlendDimensions() {
  return (
    <MemberItem title="Dimensions">
      <div className="blend-member flex items-center mb-1 text-[#000] h-[22px] bg-[#d9f7be]">
        <div className="shrink-0 border-0 border-solid border-r-[1px] border-white">
          <b className="px-1">123</b>
        </div>
        <Tooltip title="firebase__event_timestamp_day">
          <div className="p-1 w-full truncate">firebase__event_timestamp_day</div>
        </Tooltip>
        <Button danger type="text" size="small" icon={<CloseOutlined />} className="btn-close" />
      </div>
    </MemberItem>
  );
}
