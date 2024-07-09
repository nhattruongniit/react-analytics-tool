import React from "react";
import { Button } from "antd";
import { CloseOutlined, LinkOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form/Form";

// types
import { IDropdownOption, IJoinOn } from "@src/types/blender";

// context
import { JOINS } from "@src/contexts/blender-context";

// components
import JoinMemberDropdown from "./join-member-dropdown";

type IProps = {
  optionsLeft: IDropdownOption[];
  optionsRight: IDropdownOption[];
  joinOn: IJoinOn[];
  nameMember: number;
  nameJoin: number;
  form: FormInstance<any>;
  removeOn: (nameMember: number) => void;
};

function JoinConditionTable({ nameMember, nameJoin, optionsLeft, optionsRight, joinOn = [], form, removeOn }: IProps) {
  const { labelLeft, labelRight, availableMembersLeft, availableMembersRight } = React.useMemo(() => {
    const args = joinOn?.[nameMember as number]?.args || [];
    const labelLeft = optionsLeft.find((option) => option.title === args[0])?.label || "";
    const labelRight = optionsRight.find((option) => option.title === args[1])?.label || "";

    // get selected members
    const { membersLeftSelected, membersRightSelected } = joinOn.reduce(
      (acc, currItem) => {
        acc.membersLeftSelected.push(currItem.args[0]);
        acc.membersRightSelected.push(currItem.args[1]);

        return acc;
      },
      {
        membersLeftSelected: [] as string[],
        membersRightSelected: [] as string[],
      },
    );
    // get available members
    const availableMembersLeft = optionsLeft.filter((option) => !membersLeftSelected.includes(option.title || ""));
    const availableMembersRight = optionsRight.filter((option) => !membersRightSelected.includes(option.title || ""));

    return { labelLeft, labelRight, availableMembersLeft, availableMembersRight };
  }, [joinOn, nameMember, optionsLeft, optionsRight]);

  return (
    <div className="flex items-center justify-between mb-1">
      <div className="flex w-[45%] justify-between items-center text-[12px]">
        <div className="flex items-center shrink-0 w-full">
          <JoinMemberDropdown
            options={availableMembersLeft}
            label={labelLeft}
            onClick={(options) => {
              form.setFieldValue([JOINS, nameJoin, "on", nameMember, "args", 0], options.title);
            }}
          />
        </div>
      </div>
      <div className="ml-2 shrink-0">
        <LinkOutlined />
      </div>
      <div className="flex w-[45%] justify-between items-center text-[12px]">
        <div className="flex items-center shrink-0 w-full">
          <JoinMemberDropdown
            options={availableMembersRight}
            label={labelRight}
            onClick={(options) => {
              form.setFieldValue([JOINS, nameJoin, "on", nameMember, "args", 1], options.title);
            }}
          />
        </div>
      </div>
      <Button
        danger
        type="text"
        size="small"
        icon={<CloseOutlined />}
        className="btn-close"
        onClick={() => {
          removeOn(nameMember);
        }}
      />
    </div>
  );
}

export default JoinConditionTable;
