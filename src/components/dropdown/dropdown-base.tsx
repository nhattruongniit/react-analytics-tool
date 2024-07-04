import React from "react";
import { Button, Dropdown, Select } from "antd";

const DropdownBase = ({ onClick, availableMembers, ...buttonProps }: any) => {
  const selectRef = React.useRef<any>(null);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [openSelect, setOpenSelect] = React.useState(false);

  function handleChange(_: any, option: any) {
    onClick(option);
  }

  function onOpenChangeDropdown(open: boolean) {
    setOpenDropdown(open);
    setOpenSelect(open);
  }

  const items = [
    {
      key: "1",
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
          options={availableMembers}
          filterOption={(input, select) => {
            return select?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          }}
          optionRender={(option) => {
            return <div className="flex flex-wrap items-center">{option.label}</div>;
          }}
        />
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomLeft"
      trigger={["click"]}
      open={openDropdown}
      destroyPopupOnHide
      onOpenChange={onOpenChangeDropdown}
    >
      <Button
        className="border-gray-300 border-r-[1px] px-[8px]"
        size="small"
        {...buttonProps}
        onClick={() => {
          setOpenDropdown(true);
          setOpenSelect(true);
          setTimeout(() => {
            if (selectRef && selectRef.current) {
              selectRef.current.focus();
            }
          }, 20);
        }}
      />
    </Dropdown>
  );
};

export default DropdownBase;
