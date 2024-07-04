import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import MemberDropdown from "./member-dropdown";

// types
import { IAvailableMembers, IMemberBase, IMemberMeasures } from "@src/types/query-builder";
import MemberTagBase from "./v2/member-tag-base";
import { Dispatch, SetStateAction } from "react";

type IProps = {
  title: string;
  description: string;
  members: IMemberMeasures[];
  availableMembers: IAvailableMembers[];
  setMeasures: Dispatch<SetStateAction<IMemberMeasures[]>>;
};

const MemberGroupMeasure = ({ title, description, members, availableMembers, setMeasures }: IProps) => {
  const missing = members
    ? availableMembers.filter((item) => members.map((m) => m.name).indexOf(item.name) < 0)
    : availableMembers;

  function onRemove(m: IMemberBase) {
    const membersRemoved = members.filter((item) => item.name !== m.name);
    setMeasures([...membersRemoved]);
  }

  function addMembers(m: IMemberMeasures) {
    const memberItem = availableMembers.filter((item) => item.name === m.name);
    setMeasures((prevState: any) => [...prevState, ...memberItem]);
  }

  return (
    <Card
      size="small"
      title={title}
      className="h-full"
      extra={
        <div className="py-2">
          <MemberDropdown
            data-testid="title"
            onClick={(m: IMemberMeasures) => addMembers(m)}
            availableMembers={missing}
            type="dashed"
            className="border-gray-300 border-r-[1px] px-[8px]"
          >
            Add <PlusOutlined />
          </MemberDropdown>
        </div>
      }
    >
      <div className="flex">
        {members.length > 0 ? (
          <>
            {members.map((member: IMemberMeasures) => (
              <MemberTagBase key={member.name} title={member.title} member={member} onRemoveMember={onRemove} />
            ))}
          </>
        ) : (
          <>{description}</>
        )}
      </div>
    </Card>
  );
};

export default MemberGroupMeasure;
