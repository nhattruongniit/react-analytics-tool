import { EditOutlined } from "@ant-design/icons";
import { Form, Input, Popover, Tooltip } from "antd";

// context
import { IDimensionBlender } from "@src/types/blender";

type IProps = {
  nodeName: number;
  dataDimensions: IDimensionBlender[];
  title: string;
};

export default function BlendDimensionsPopover({ nodeName, dataDimensions, title }: IProps) {
  return (
    <Popover
      trigger="click"
      rootClassName="member-popover member-popover-dimension"
      placement="topRight"
      content={
        <div className="w-[400px]">
          <div className="">
            <div className="text-[12px]">Alias name</div>
            <div className="border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-solid">
              <Form.Item noStyle name={[nodeName, "alias"]}>
                <Input className="p-0" placeholder="(Enter alias name)" variant="borderless" />
              </Form.Item>
            </div>
            <div className="text-[10px]">
              Source field: <b>{dataDimensions?.[nodeName]?.name}</b>
            </div>
          </div>
        </div>
      }
      title={
        <div className="flex items-center text-[12px] font-normal">
          <div className="px-1 w-[30px] text-center">
            <div className="uppercase text-[9px]">123</div>
          </div>
          <Tooltip title="firebase__event_timestamp_day">
            <div className="p-1 w-full truncate">{title}</div>
          </Tooltip>
        </div>
      }
    >
      <div className="member-measure w-[30px] text-center cursor-pointer shrink-0 border-0 border-solid border-r-[1px] border-white">
        <b className="member-operator px-1">123</b>
        <div className="member-icon-edit">
          <EditOutlined />
        </div>
      </div>
    </Popover>
  );
}
