import React from "react";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, MenuProps, Select, Tooltip } from "antd";

// types
import { ISchema } from "@src/types/explorer";
import { INodeBlenderItem } from "@src/types/blender";

// context
import { SOURCE } from "@src/contexts/blender-context";

// components
import BlendMeasuresPopover from "./blend-measures-popover";

type IProps = {
  name: number;
  schema: ISchema[];
  source: INodeBlenderItem;
};

export default function BlendMeasure({ name, schema, source }: IProps) {
  const selectRef = React.useRef<any>(null);
  const [openSelect, setOpenSelect] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const dataMeasures = Form.useWatch([SOURCE, name, "measures"]);

  function onOpenChangeDropdown(open: boolean) {
    setOpenDropdown(open);
    setOpenSelect(open);
  }

  return (
    <>
      <div className="mb-3">
        <Form.List name={[name, "measures"]}>
          {(fields, { add, remove }) => {
            const items: MenuProps["items"] = [
              {
                key: "0",
                label: (
                  <Select
                    ref={selectRef}
                    showSearch
                    open={openSelect}
                    style={{
                      minWidth: "300px",
                      width: "100%",
                    }}
                    onSelect={(value) => {
                      add({
                        name: value,
                        alias: null,
                        type: "basic",
                        aggregation: "sum",
                        args: [`${source?.source_alias}.${value}`],
                      });
                      setOpenSelect(false);
                    }}
                    options={schema.map((item) => ({
                      label: item.name,
                      value: item.name,
                    }))}
                    filterOption={(input, select) => {
                      return select ? select?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                    }}
                  />
                ),
              },
            ];
            return (
              <React.Fragment>
                <div className="mb-1 text-[12px]">
                  <div className="font-bold mb-1">Measure</div>
                  {fields.map(({ key, name: nodeName }) => {
                    const title = dataMeasures[nodeName].alias || dataMeasures[nodeName].name;
                    return (
                      <div key={key} className="blend-member flex items-center mb-1 text-[#000] h-[22px] bg-[#bae0ff]">
                        {/* change aggregation */}
                        <BlendMeasuresPopover dataMeasures={dataMeasures} nodeName={nodeName} title={title} />

                        <Tooltip title={title}>
                          <div className="p-1 w-full truncate">{title}</div>
                        </Tooltip>
                        <Button
                          danger
                          type="text"
                          size="small"
                          icon={<CloseOutlined />}
                          className="btn-close"
                          onClick={() => remove(nodeName)}
                        />
                      </div>
                    );
                  })}
                </div>

                <Dropdown
                  menu={{ items }}
                  placement="bottomLeft"
                  trigger={["click"]}
                  open={openDropdown}
                  destroyPopupOnHide
                  onOpenChange={onOpenChangeDropdown}
                >
                  <Button
                    type="dashed"
                    size="small"
                    icon={<PlusCircleOutlined />}
                    className="w-full text-left"
                    onClick={() => {
                      setOpenDropdown(true);
                      setOpenSelect(true);
                      setTimeout(() => {
                        if (selectRef && selectRef.current) {
                          selectRef.current.focus();
                        }
                      }, 20);
                    }}
                  >
                    Add member
                  </Button>
                </Dropdown>
              </React.Fragment>
            );
          }}
        </Form.List>
      </div>
    </>
  );
}
