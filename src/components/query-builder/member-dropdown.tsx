import React from "react";
import { IMemberBase } from "@src/types/query-builder";
import { Button, Dropdown, Select, Tag, Tooltip } from "antd";

function groupByCube(availableMembers: IMemberBase[]) {
  const allowedMembers = "firebase,user_on_boarding_survey,user_ab_testing,user_ua_info".split(",") || [];

  const memberOptions = availableMembers.filter((member) => {
    const cubeName = member.name.split(".")[0];

    return allowedMembers.includes(cubeName);
  });

  const result = [];
  const map = new Map();
  for (const item of memberOptions) {
    const [label] = item.name.split(".");
    if (!map.has(label)) {
      map.set(label, []);
    }
    map.get(label).push(item);
  }
  for (const [label, options] of map) {
    const option = options.map((item: any) => ({
      ...item,
      value: item.name,
      // label: item.title,
      label: item.shortTitle,
    }));

    result.push({ label: label.split("_").join(" "), options: option });
  }
  return result;
}

const MemberDropdown = ({ onClick, availableMembers, ...buttonProps }: any) => {
  const cubOptions = React.useMemo(() => groupByCube(availableMembers), [availableMembers]);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [openSelect, setOpenSelect] = React.useState(false);
  const selectRef = React.useRef<any>(null);

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
          options={cubOptions}
          filterOption={(input, select) => {
            return select?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          }}
          optionRender={(option) => {
            return (
              <div className="flex flex-wrap items-center">
                <Tooltip title={option.data.title} placement="right" className="flex">
                  <div className="" aria-label={option.data.label}>
                    {option.data.label}
                  </div>
                  {!option.data.public && (
                    <div className="shrink ml-2">
                      <Tag color="gold">Test Mode</Tag>
                    </div>
                  )}
                </Tooltip>
              </div>
            );
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
        className="border-[#1677ff] border-0 border-l-[1px] border-t-[1px] border-b-[1px] w-full text-left"
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

export default MemberDropdown;
