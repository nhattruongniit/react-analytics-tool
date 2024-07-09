import { Tooltip } from "antd";

// types
import { IDimensionBlender, IMeasureBlender } from "@src/types/blender";

// configs
import { AGGREGATE } from "@src/config/blend-explorer";

type IProps = {
  data: IDimensionBlender | IMeasureBlender;
  bgColor?: string;
};

function BlendResultItem({ data, bgColor }: IProps) {
  const nameAggregation = AGGREGATE[data?.aggregation || ""]?.short_title || "123";
  const label = data?.alias || data?.name;

  return (
    <div className="flex items-center mb-1 text-[#000] h-[22px]" style={{ backgroundColor: bgColor }}>
      <div className="shrink-0 border-0 border-solid border-r-[1px] border-white w-[30px] text-center">
        <b className="uppercase text-[9px]">{nameAggregation}</b>
      </div>
      <Tooltip
        title={
          <div className="text-[12px]">
            {label} <i>({data.step})</i>
          </div>
        }
      >
        <div className="p-1 w-full truncate">
          {label} <i className="text-gray-500">({data.step})</i>
        </div>
      </Tooltip>
    </div>
  );
}

export default BlendResultItem;
