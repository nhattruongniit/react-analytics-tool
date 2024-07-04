import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Select } from "antd";

type IProps = React.PropsWithChildren & {
  title?: string;
};

export default function MemberItem({ title, children }: IProps) {
  const selectRef = React.useRef<any>(null);
  const [openSelect, setOpenSelect] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);

  function handleChange(_: any, option: any) {
    console.log("handleChange: ", option);
  }

  function onOpenChangeDropdown(open: boolean) {
    setOpenDropdown(open);
    setOpenSelect(open);
  }

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Select
          ref={selectRef}
          showSearch
          open={openSelect}
          onChange={handleChange}
          style={{
            minWidth: "300px",
            width: "100%",
          }}
          options={[
            {
              label: "firebase__event_timestamp_day",
              value: "firebase__event_timestamp_day",
            },
          ]}
          filterOption={(input, select) => {
            return select ? select?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
          }}
        />
      ),
    },
  ];

  return (
    <div className="mb-3 text-[12px]">
      <div className="mb-1">
        {title && <div className="font-bold mb-1">{title}</div>}

        {children}
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
    </div>
  );
}
