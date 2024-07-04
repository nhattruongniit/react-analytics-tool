import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

type IProps = {
  member: any;
  title: string;
  onRemoveMember: (member: any) => void;
};

function MemberTagBase({ title, member, onRemoveMember }: IProps) {
  return (
    <div className="member-tag flex items-center rounded-md border-solid border-[1px] pl-1 mr-2 py-1 border-[#1677ff]">
      <div className="mr-2">{title}</div>
      <Button
        onClick={() => onRemoveMember(member)}
        danger
        size="small"
        icon={<CloseOutlined className="hover:text-[#f00]" style={{ color: "#1677ff" }} />}
        className="flex items-center border-0 p-0 m-0 w-[18px] h-[18px]"
      />
    </div>
  );
}

export default MemberTagBase;
