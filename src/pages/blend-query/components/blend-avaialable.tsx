import { Tooltip } from "antd";

function BlendAvaiable() {
  return (
    <div className="mb-3 text-[12px]">
      <div className="mb-1">
        <div className="font-bold mb-1">Available Fields</div>
        <div className="flex items-center mb-1 text-[#000] bg-[#d9f7be] h-[22px]">
          <div className="shrink-0 border-0 border-solid border-r-[1px] border-white">
            <b className="px-1">123</b>
          </div>
          <Tooltip title="firebase__event_timestamp_day">
            <div className="p-1 w-full truncate">firebase__event_timestamp_day</div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default BlendAvaiable;
