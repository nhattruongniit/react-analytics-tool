import React, { Dispatch, SetStateAction } from "react";

// types
import { IAvailableMembers, IMemberDimensions } from "@src/types/query-builder";

// helpers
import { mapMemberToTreeNode } from "@src/helpers/tree-select-member";

// components
import MemberGroupBase from "./member-group-base";

type IProps = {
  title: string;
  description: string;
  members: IMemberDimensions[];
  availableMembers: IAvailableMembers[];
  setDimensions: Dispatch<SetStateAction<IMemberDimensions[]>>;
};

function MemberGroupDimensions({
  title,
  description = "Select item to display",
  members,
  availableMembers,
  setDimensions,
}: IProps) {
  const cubOptions = React.useMemo(() => mapMemberToTreeNode(availableMembers), [availableMembers]);
  const getDefaultCheckedKeys = React.useMemo(() => {
    const keyDimensions = members.map((m) => m.name);
    return [...keyDimensions];
  }, [members]);

  function addMembers(dimensionsSelected: IMemberDimensions[], membersUnSelected: React.Key[]) {
    setDimensions((prevState) => {
      if (membersUnSelected.length > 0) {
        const dimensions = prevState.filter((m) => !membersUnSelected.includes(m.name));
        return [...dimensions];
      }
      return [...new Set([...prevState, ...dimensionsSelected])];
    });
  }

  return (
    <MemberGroupBase
      title={title}
      dataSource={cubOptions}
      getDefaultCheckedKeys={getDefaultCheckedKeys}
      onOk={(selectedMembers: React.Key[], membersUnSelected = []) => {
        const members = availableMembers.filter((m) => selectedMembers.includes(m.name));
        addMembers(members, membersUnSelected);
      }}
    >
      {members.length > 0 ? (
        <div className="flex flex-wrap">
          <div className="flex flex-wrap mr-2">
            {members.map((member) => {
              return (
                <div key={member.title} className="mb-2 mr-2">
                  <div className="rounded-md border-solid border-[1px] inline-block px-1 py-1 border-[#1677ff]">
                    {member.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>{description}</>
      )}
    </MemberGroupBase>
  );
}

export default MemberGroupDimensions;
