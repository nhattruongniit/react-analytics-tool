import React from "react";
import { Dropdown, Select, Tooltip } from "antd";

// types
import { IDropdownOption } from "@src/types/blender";

type IProps = React.PropsWithChildren & {
  onClick?: (option: any) => void;
  options: IDropdownOption[];
  label: string;
};

const JoinMemberDropdown = ({ onClick, label, options }: IProps) => {
  const selectRef = React.useRef<any>(null);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [openSelect, setOpenSelect] = React.useState(false);

  function handleChange(_: any, option: any) {
    onClick && onClick(option);
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
          options={options}
          filterOption={(input, select) => {
            return select ? select?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
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
      <div
        className="w-full text-left text-[12px] p-0 cursor-pointer"
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
        {label ? (
          <div className="blend-member flex items-center grow-[1] text-[#000] h-[24px] bg-[#d9f7be] hover:bg-[#bbee8e]">
            <div className="shrink-0 border-0 border-solid border-r-[1px] border-white">
              <b className="px-1">123</b>
            </div>
            <Tooltip title={label}>
              <div className="p-1 w-full truncate">{label}</div>
            </Tooltip>
          </div>
        ) : (
          <div className="blend-member flex items-center grow-[1] text-[#000] h-[24px] bg-[#f9d4d4] hover:bg-[#f1b4b4]">
            <div className="shrink-0 border-0 border-solid border-r-[1px] border-white">
              <b className="px-1">123</b>
            </div>
            <div className="p-1 w-full truncate">Missing field</div>
          </div>
        )}
      </div>
    </Dropdown>
  );
};

export default JoinMemberDropdown;
