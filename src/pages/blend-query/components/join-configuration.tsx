import React from "react";
import { CheckOutlined, CloseOutlined, EditOutlined, LinkOutlined } from "@ant-design/icons";
import { Button, Divider, Modal, Tooltip } from "antd";

// assets
import LeftOuter from "@src/assets/images/left-outer.svg";
import RightOuter from "@src/assets/images/right-outer.svg";
import Inner from "@src/assets/images/inner.svg";
import FullOuter from "@src/assets/images/full-outer.svg";
import Cross from "@src/assets/images/cross.svg";

// components
import MemberItem from "./member-item";

const joinOptions = [
  {
    id: "left-outer",
    name: "Left outer",
    image: LeftOuter,
    description: "Returns matching rows from the right table, plus non-matching rows from the left tables",
  },
  {
    id: "right-outer",
    name: "Right outer",
    image: RightOuter,
    description: "Returns matching rows from the left tables, plus non-matching rows from the right table",
  },
  {
    id: "inner",
    name: "Inner",
    image: Inner,
    description: "Returns only matching rows from the left and right tables",
  },
  {
    id: "full-outer",
    name: "Full outer",
    image: FullOuter,
    description: "Returns all rows from the left tables and right table, whether they match or not",
  },
  {
    id: "cross",
    name: "Cross",
    image: Cross,
    description: "Returns every possible combination of rows from the left and right tables",
  },
];

function JoinConfiguration() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function handleOk() {
    setIsModalOpen(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="relative px-2 shrink-0 overflow-auto">
        <Divider className="absolute left-0 top-1/2 m-0 bg-blue-700" />
        <div
          className="flex flex-col items-center justify-between relative p-2 cursor-pointer border-[#E0E0E0] border-[1px] dark:border-[#2b2b2b] rounded-md border-solid bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-[#141414]"
          onClick={handleOpenModal}
        >
          <div className="text-center mb-2">Configure join</div>
          <EditOutlined />
        </div>
      </div>

      <Modal
        title="Join configuration"
        width={700}
        className="modal-analytics"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="mb-2 text-[16px]">Join operator</div>
        <div className="text-[12px]">
          Tell us how rows from all the tables on the left and the table to the right are combined.
        </div>

        <div className="mt-2">
          <div className="border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-t-[1px] border-l-[1px] border-solid mb-4">
            <div className="flex border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-solid">
              {joinOptions.map((option) => (
                <div
                  key={option.id}
                  className="text-center cursor-pointer border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-r-[1px] border-solid bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-[#141414] w-full py-2"
                >
                  <CheckOutlined />
                  <div>
                    <img src={option.image} alt="left-outer" className="w-[85px] h-[60px]" />
                    <div>{option.name}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 text-[12px] border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-r-[1px] border-solid">
              Returns matching rows from the right table, plus non-matching rows from the left tables
            </div>
          </div>
        </div>

        <Divider className="m-0 mb-3" />

        <div className="mb-2 text-[16px]">Join conditions</div>
        <div className="text-[12px] mb-3">
          Tell us how these tables are related. Add one or more fields from the tables to the left that match the fields
          in the table to the right.
        </div>

        <div className="flex items-center text-[12px]">
          <div className="w-[45%]">
            <div className="blend-member flex items-center w-full mb-1 text-[#000] h-[22px] bg-[#d9f7be]">
              <div className="shrink-0 border-0 border-solid border-r-[1px] border-white">
                <b className="px-1">123</b>
              </div>
              <Tooltip title="firebase__event_timestamp_day">
                <div className="p-1 w-full truncate">firebase__event_timestamp_day</div>
              </Tooltip>
              <Button danger type="text" size="small" icon={<CloseOutlined />} className="btn-close" />
            </div>
          </div>
          <div className="shrink-0 mx-4">
            <LinkOutlined />
          </div>
          <div className="w-[45%]">
            <div className="blend-member flex items-center mb-1 text-[#000] h-[22px] bg-[#d9f7be]">
              <div className="shrink-0 border-0 border-solid border-r-[1px] border-white">
                <b className="px-1">123</b>
              </div>
              <Tooltip title="firebase__event_timestamp_day">
                <div className="p-1 w-full truncate">
                  firebase__event_timestamp_dayfirebase__event_timestamp_dayfirebase__event_timestamp_dayfirebase__event_timestamp_day
                </div>
              </Tooltip>
              <Button danger type="text" size="small" icon={<CloseOutlined />} className="btn-close" />
            </div>
          </div>
        </div>
        <div className="flex items-center text-[12px]">
          <div className="w-[45%]">
            <div className="blend-member flex items-center w-full mb-1 text-[#000] h-[22px] bg-[#d9f7be]">
              <div className="shrink-0 border-0 border-solid border-r-[1px] border-white">
                <b className="px-1">123</b>
              </div>
              <Tooltip title="firebase__event_timestamp_day">
                <div className="p-1 w-full truncate">firebase__event_timestamp_day</div>
              </Tooltip>
              <Button danger type="text" size="small" icon={<CloseOutlined />} className="btn-close" />
            </div>
          </div>
          <div className="shrink-0 mx-4">
            <LinkOutlined />
          </div>
          <div className="w-[45%]">
            <div className="blend-member flex items-center w-full mb-1 text-[#000] h-[22px] bg-[#d9f7be]">
              <div className="shrink-0 border-0 border-solid border-r-[1px] border-white">
                <b className="px-1">123</b>
              </div>
              <Tooltip title="firebase__event_timestamp_day">
                <div className="p-1 w-full truncate">firebase__event_timestamp_day</div>
              </Tooltip>
              <Button danger type="text" size="small" icon={<CloseOutlined />} className="btn-close" />
            </div>
          </div>
        </div>
        <div className="flex items-center text-[12px]">
          <div className="w-[45%]">
            <MemberItem />
          </div>
          <div className="shrink-0 mx-4">
            <LinkOutlined />
          </div>
          <div className="w-[45%]">
            <MemberItem />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default JoinConfiguration;
