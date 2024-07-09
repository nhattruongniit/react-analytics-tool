import { Form, Input, Popover, Radio, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

// types
import { IMeasureBlender } from "@src/types/blender";

// configs
import { AGGREGATE } from "@src/config/blend-explorer";

type IProps = {
  nodeName: number;
  dataMeasures: IMeasureBlender[];
  title: string;
};

function BlendMeasuresPopover({ dataMeasures, nodeName, title }: IProps) {
  const nameAggregation = AGGREGATE[dataMeasures[nodeName].aggregation]?.short_title || "sum";

  return (
    <Popover
      trigger="click"
      rootClassName="member-popover"
      placement="topRight"
      content={
        <div className="w-[400px]">
          <div className="text-[12px]">Alias name</div>
          <div className="border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-solid">
            <Form.Item noStyle name={[nodeName, "alias"]}>
              <Input className="p-0" placeholder="(Enter alias name)" variant="borderless" />
            </Form.Item>
          </div>
          <div className="text-[10px]">
            Source field: <b>{dataMeasures[nodeName].name}</b>
          </div>
          <div className="text-[12px] mb-2 mt-3">Aggregation</div>
          <Form.Item noStyle name={[nodeName, "aggregation"]}>
            <Radio.Group className="flex flex-col">
              {Object.keys(AGGREGATE).map((key) => (
                <Radio key={key} value={AGGREGATE[key].value}>
                  <span className="text-[12px]">{AGGREGATE[key].label}</span>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </div>
      }
      title={
        <div className="flex items-center text-[12px] font-normal">
          <div className="px-1 w-[30px] text-center">
            <div className="uppercase text-[9px]">{nameAggregation}</div>
          </div>
          <Tooltip title="firebase__event_timestamp_day">
            <div className="p-1 w-full truncate">{title}</div>
          </Tooltip>
        </div>
      }
    >
      <div className="member-measure w-[30px] text-center cursor-pointer shrink-0 border-0 border-solid border-r-[1px] border-white">
        <div className="member-operator uppercase text-[9px]">{nameAggregation}</div>
        <div className="member-icon-edit">
          <EditOutlined />
        </div>
      </div>
    </Popover>
  );
}

export default BlendMeasuresPopover;
